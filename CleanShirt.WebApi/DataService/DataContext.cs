using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace CleanShirt.WebApi.DataService
{
    public class DataContext : DbContext
    {
        public DataContext() : base("CleanShirt")
        {

        }

        //public DbSet<ClassName> Classname { get; set; }
    }
}