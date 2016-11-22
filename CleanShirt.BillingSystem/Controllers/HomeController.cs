using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using CleanShirt.BillingSystem.ViewModels;

namespace CleanShirt.BillingSystem.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult BillingList(List<OrderViewModel> orders)
        {
            return PartialView(orders);
        }
    }
}