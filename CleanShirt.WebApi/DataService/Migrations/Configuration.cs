using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Migrations;
using CleanShirt.WebApi.DBModels;

namespace CleanShirt.WebApi.DataService.Migrations
{
    internal sealed class Configuration : DbMigrationsConfiguration<DataService.DataContext>
    {
        public Configuration()
        {
            this.MigrationsDirectory = "Dataservice\\Migrations";
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(DataService.DataContext context)
        {
            var products = new List<Product>
            {
                new Product {Id = 1, Name = "Shirt, blue", Price = 299, QuantityInStorage = 100, ImageUrl = "1.jpg"},
                new Product {Id = 2, Name = "Shirt, white", Price = 299, QuantityInStorage = 100, ImageUrl = "2.jpg"},
                new Product {Id = 3, Name = "Shirt, pink", Price = 299, QuantityInStorage = 100, ImageUrl = "3.jpg"},
                new Product {Id = 4, Name = "Shirt, gray", Price = 299, QuantityInStorage = 100, ImageUrl = "4.jpg"},
                new Product {Id = 5, Name = "Shirt, striped", Price = 299, QuantityInStorage = 100, ImageUrl = "5.jpg"},
            };



            products.ForEach(x => context.Products.Add(x));
        }
    }
}
