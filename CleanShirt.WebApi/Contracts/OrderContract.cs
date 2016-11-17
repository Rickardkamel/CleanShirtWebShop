using System;
using System.Collections.Generic;

namespace CleanShirt.WebApi.Contracts
{
    public class OrderContract
    {
        public int Id { get; set; }
        public int CustomerId { get; set; }
        public int TotalPrice { get; set; }
        public DateTime OrderedDate { get; set; }
        public bool Billed { get; set; }
        public bool Sent { get; set; }
        public DateTime BilledDate { get; set; }
        public DateTime SentDate { get; set; }

        public virtual CustomerContract Customer { get; set; }
        public virtual IList<OrderLineContract> OrderLines { get; set; }
    }
}