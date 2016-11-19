using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using CleanShirt.WebApi.Controllers;
using CleanShirt.WebShop.ViewModels;

namespace CleanShirt.WebShop.Controllers
{
    public class HomeController : Controller
    {
        public readonly ProductController _productController;
        public HomeController()
        {
            _productController = new ProductController();
        }
        public ActionResult Index(List<ProductViewModel> products)
        {

            var productList = _productController.Get();
            var productViewModelList = new List<ProductViewModel>();
            foreach (var item in productList)
            {
                var convertedProduct = new ProductViewModel
                {
                    Id = item.Id,
                    ImageUrl = item.ImageUrl,
                    Name = item.Name,
                    Price = item.Price,
                    QuantityInStorage = item.QuantityInStorage
                };
                productViewModelList.Add(convertedProduct);
            }

            return View(productViewModelList);
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