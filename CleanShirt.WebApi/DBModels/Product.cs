namespace CleanShirt.WebApi.DBModels
{
    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Price { get; set; }
        public int QuantityInStorage { get; set; }
        public string ImageUrl { get; set; }
    }
}