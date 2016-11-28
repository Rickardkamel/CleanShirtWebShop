using System.Collections.Generic;
using System.Web.Mvc;
using CleanShirt.WareHouseSystem.ViewModels;

namespace CleanShirt.WareHouseSystem.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult WarehouseList(List<OrderViewModel> orders)
        {
            return PartialView(orders);
        }
        public ActionResult CheckList(OrderViewModel order)
        {
            return PartialView(order);
        }
    }
}