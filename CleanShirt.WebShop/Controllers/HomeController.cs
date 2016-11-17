using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using CleanShirt.WebApi.Controllers;

namespace CleanShirt.WebShop.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            var x = new ProductController();

            var c = x.Get();

            return View(c);
        }
    }
}