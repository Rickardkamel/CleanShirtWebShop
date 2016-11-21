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
        public readonly ProductController _productController;
        public HomeController()
        {
            _productController = new ProductController();
        }
        public ActionResult Index()
        {
            //var productList = _productController.Get();

            //var productViewModelList = productList.Select(item => new ProductViewModel
            //{
            //    Id = item.Id,
            //    ImageUrl = item.ImageUrl,
            //    Name = item.Name,
            //    Price = item.Price,
            //    QuantityInStorage = item.QuantityInStorage
            //}).ToList();

            //return View(productViewModelList);
            return View();
        }

        public ActionResult Products(List<ProductViewModel> products)
        {
            if (Request.IsAjaxRequest())
            {
                return View("Index", products);
            }
            else
            {
                return View("Index");
            }
            var p = products;

            return View(products);
        }

        public ActionResult AddToCart(ProductViewModel product)
        {
            //var productFromApi = _productController.Get(product.Id);
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