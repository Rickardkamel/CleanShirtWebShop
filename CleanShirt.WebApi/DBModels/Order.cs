using System;
using System.Collections.Generic;

namespace CleanShirt.WebApi.DBModels
{
    public class Order
    {
        public int Id { get; set; }
        public int CustomerId { get; set; }
        public int TotalPrice { get; set; }
        public DateTime OrderedDate { get; set; }
        public bool Billed { get; set; }
        public bool Sent { get; set; }
        public DateTime? BilledDate { get; set; }
        public DateTime? SentDate { get; set; }

        public virtual Customer Customer { get; set; }
        public virtual IList<OrderLine> OrderLines { get; set; }
    }
}