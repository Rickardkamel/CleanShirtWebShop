using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using CleanShirt.WebShop.ViewModels;
using Contracts;

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

        public JsonResult RegisterCart(CustomerContract customer)
        {
            var cust = customer;

            var shoppingList = (ShoppingCartViewModel)Session["shoppingCart"];

            var orderLines = shoppingList.ShoppingCartItems.Select(item => new OrderLineContract
            {
                PricePerProduct = item.Product.Price,
                ProductName = item.Product.Name,
                Quantity = item.Quantity
            }).ToList();

            var totalPrice = orderLines.Sum(item => (item.PricePerProduct*item.Quantity));

            var order = new OrderContract
            {
                Customer = cust,
                Billed = false,
                Sent = false,
                BilledDate = DateTime.Now.Date,
                SentDate = DateTime.Now.Date,
                OrderedDate = DateTime.Now.Date,
                OrderLines = orderLines,
                TotalPrice = totalPrice,
            };

            return Json(order);
        }

        // TODO: CHECKOUT
    }
}