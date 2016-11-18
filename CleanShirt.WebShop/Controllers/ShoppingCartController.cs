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
    }
}