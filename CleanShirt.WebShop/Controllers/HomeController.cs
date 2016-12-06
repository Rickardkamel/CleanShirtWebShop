using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using CleanShirt.WebApi.Controllers;
using CleanShirt.WebShop.ViewModels;
using Contracts;
using Newtonsoft.Json.Linq;

namespace CleanShirt.WebShop.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Error()
        {
            Server.ClearError();
            return View();
        }

        public ActionResult Products(List<ProductViewModel> products)
        {
            return PartialView(products);
        }

        public ActionResult CartSummary()
        {
            if (Session["shoppingCart"] == null)
            {
                var emptyCartToDisplay = new CartSummaryViewModel
                {
                    TotalPrice = 0,
                    TotalProducts = 0
                };

                return PartialView(emptyCartToDisplay);
            }
            var cart = (ShoppingCartViewModel)Session["shoppingCart"];
            var totalProducts = 0;
            var totalPrice = 0;
            foreach (var item in cart.ShoppingCartItems)
            {
                totalProducts += item.Quantity;
                totalPrice += item.Quantity * item.Product.Price;
            }

            var summaryToDisplay = new CartSummaryViewModel
            {
                TotalPrice = totalPrice,
                TotalProducts = totalProducts
            };

            return PartialView(summaryToDisplay);
        }

        public ActionResult AddToCart(ProductViewModel product)
        {

            var convertedProduct = new ShoppingCartItemViewModel
            {
                Product = product,
                Quantity = 1
            };

            if (Session["shoppingCart"] == null)
            {
                var newShoppingCart = new ShoppingCartViewModel
                {
                    ShoppingCartItems = new List<ShoppingCartItemViewModel>()
                };
                newShoppingCart.ShoppingCartItems.Add(convertedProduct);

                foreach (var item in newShoppingCart.ShoppingCartItems)
                {
                    Session["totalCartPrice"] = item.Quantity * item.Product.Price;
                }
                Session["totalCartPrice"] =

                Session["shoppingCart"] = newShoppingCart;
            }
            else
            {
                var shoppingList = (ShoppingCartViewModel)Session["shoppingCart"];

                foreach (var item in shoppingList.ShoppingCartItems)
                {
                    if (item.Product.Name == convertedProduct.Product.Name)
                    {
                        item.Quantity++;
                        Session["shoppingCart"] = shoppingList;
                        return View("Index");
                    }

                    Session["totalCartPrice"] = item.Quantity * item.Product.Price;

                    ViewBag.Test = (int)Session["totalCartPrice"];
                }

                shoppingList.ShoppingCartItems.Add(convertedProduct);

                Session["shoppingCart"] = shoppingList;
            }

            return View("Index");
        }


    }
}