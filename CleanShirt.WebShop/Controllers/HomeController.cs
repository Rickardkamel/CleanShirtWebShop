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
        //public readonly ProductController _productController;
        //public HomeController()
        //{
        //    _productController = new ProductController();
        //}
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Products(List<ProductViewModel> products)
        {
            return PartialView(products);
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
                }

                shoppingList.ShoppingCartItems.Add(convertedProduct);

                Session["shoppingCart"] = shoppingList;
            }

            return View("Index");
        }

        
    }
}