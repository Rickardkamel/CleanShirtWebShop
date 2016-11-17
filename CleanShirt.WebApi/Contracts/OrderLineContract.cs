namespace CleanShirt.WebApi.Contracts
{
    public class OrderLineContract
    {
        public int Id { get; set; }
        public string ProductName { get; set; }
        public int Quantity { get; set; }
        public int PricePerProduct { get; set; }
    }
}