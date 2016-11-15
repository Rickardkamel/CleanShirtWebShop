using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using CleanShirt.WebApi.DBModels;

namespace CleanShirt.WebApi.DataService
{
    public class DataContext : DbContext
    {
        public DataContext() : base("CleanShirtDB")
        {

        }

        public DbSet<Customer> Customers { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<Order> Orders { get; set; }
        //public DbSet<OrderLine> OrderLines { get; set; }
    }
}