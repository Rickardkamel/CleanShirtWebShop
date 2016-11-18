using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CleanShirt.WebShop.ViewModels
{
    public class ShoppingCartItemViewModel
    {
        public ProductViewModel Product { get; set; }
        public int Quantity { get; set; }
    }
}