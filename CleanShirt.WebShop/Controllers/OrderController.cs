using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using CleanShirt.WebShop.ViewModels;

namespace CleanShirt.WebShop.Controllers
{
    public class OrderController : Controller
    {
        // GET: Order
        public ActionResult Index()
        {
            return View("Index");
        }

        public ActionResult OrderStatusList(List<OrderViewModel> orders)
        {
            return PartialView(orders);
        }
    }
}