using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using CleanShirt.WebShop.ViewModels;

namespace CleanShirt.WebShop.Controllers
{
    public class ShoppingCartController : Controller
    {
        // GET: ShoppingCart
        public ActionResult Index()
        {
            var shoppingCart = (ShoppingCartViewModel)Session["shoppingCart"];

            return View(shoppingCart);
        }

        public JsonResult UpdateItemInCart(ShoppingCartItemViewModel shoppingCartItem)
        {
            var shoppingList = (ShoppingCartViewModel)Session["shoppingCart"];

            foreach (var item in shoppingList.ShoppingCartItems)
            {
                if (item.Product.Id == shoppingCartItem.Product.Id)
                {
                    item.Quantity = shoppingCartItem.Quantity;
                }
            }

            Session["shoppingCart"] = shoppingList;

            return Json(shoppingList);
        }

        public JsonResult RemoveFromCart(int id)
        {
            var shoppingList = (ShoppingCartViewModel)Session["shoppingCart"];

            shoppingList.ShoppingCartItems.Remove(shoppingList.ShoppingCartItems.FirstOrDefault(x => x.Product.Id == id));

            Session["shoppingCart"] = shoppingList;

            return Json(shoppingList);
        }

        // TODO: CHECKOUT
    }
}