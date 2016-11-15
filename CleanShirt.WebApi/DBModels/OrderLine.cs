using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CleanShirt.WebApi.DBModels
{
    public class OrderLine
    {
        public int Id { get; set; }
        public string ProductName { get; set; }
        public int Quantity { get; set; }
        public int PricePerProduct { get; set; }
    }
}