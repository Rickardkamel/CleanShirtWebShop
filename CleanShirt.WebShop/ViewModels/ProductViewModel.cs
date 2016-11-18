using System;
using System.Linq;
using System.Web;

namespace CleanShirt.WebShop.ViewModels
{
    public class ProductViewModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Price { get; set; }
        public int QuantityInStorage { get; set; }
        public string ImageUrl { get; set; }
    }
}