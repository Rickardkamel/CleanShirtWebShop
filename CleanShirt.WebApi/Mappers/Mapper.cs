using System.Collections.Generic;
using System.Linq;
using CleanShirt.WebApi.Contracts;
using CleanShirt.WebApi.DBModels;

namespace CleanShirt.WebApi.Mappers
{
    public static class Mapper
    {
        #region Contract

        #region Object

        public static ProductContract ToContract(this Product product)
        {
            return new ProductContract
            {
                Id = product.Id,
                Name = product.Name,
                Price = product.Price,
                ImageUrl = product.ImageUrl,
                QuantityInStorage = product.QuantityInStorage
            };
        }

        public static CustomerContract ToContract(this Customer customer)
        {
            return new CustomerContract
            {
                Id = customer.Id,
                FirstName = customer.FirstName,
                LastName = customer.LastName,
                Adress = customer.Adress,
                City = customer.City,
                ZipCode = customer.ZipCode
            };
        }

        public static OrderContract ToContract(this Order order)
        {
            return new OrderContract
            {
                Id = order.Id,
                Sent = order.Sent,
                Billed = order.Billed,
                SentDate = order.SentDate,
                CustomerId = order.CustomerId,
                BilledDate = order.BilledDate,
                TotalPrice = order.TotalPrice,
                OrderedDate = order.OrderedDate,
                OrderLines = order.OrderLines.ToList().ToContracts(),
            };
        }

        public static OrderLineContract ToContract(this OrderLine orderLine)
        {
            return new OrderLineContract
            {
                Id = orderLine.Id,
                Quantity = orderLine.Quantity,
                ProductName = orderLine.ProductName,
                PricePerProduct = orderLine.PricePerProduct,
            };
        }

        #endregion

        #region List

        public static List<ProductContract> ToContracts(this List<Product> products)
        {
            return products.ConvertAll(x => new ProductContract
            {
                Id = x.Id,
                Name = x.Name,
                Price = x.Price,
                ImageUrl = x.ImageUrl,
                QuantityInStorage = x.QuantityInStorage
            });
        }

        public static List<CustomerContract> ToContracts(this List<Customer> customers)
        {
            return customers.ConvertAll(x => new CustomerContract
            {
                Id = x.Id,
                FirstName = x.FirstName,
                LastName = x.LastName,
                Adress = x.Adress,
                City = x.City,
                ZipCode = x.ZipCode
            });
        }

        public static List<OrderContract> ToContracts(this List<Order> orders)
        {
            return orders.ConvertAll(x => new OrderContract
            {
                Id = x.Id,
                Sent = x.Sent,
                Billed = x.Billed,
                SentDate = x.SentDate,
                CustomerId = x.CustomerId,
                BilledDate = x.BilledDate,
                TotalPrice = x.TotalPrice,
                OrderedDate = x.OrderedDate,
                OrderLines = x.OrderLines.ToList().ToContracts(),
            });
        }

        public static List<OrderLineContract> ToContracts(this List<OrderLine> orderLines)
        {
            return orderLines.ConvertAll(x => new OrderLineContract
            {
                Id = x.Id,
                Quantity = x.Quantity,
                ProductName = x.ProductName,
                PricePerProduct = x.PricePerProduct,
            });
        }

        #endregion

        #endregion

        #region Entity

        #region Object

        public static Product ToEntity(this ProductContract productContract)
        {
            return new Product
            {
                Id = productContract.Id,
                Name = productContract.Name,
                Price = productContract.Price,
                ImageUrl = productContract.ImageUrl,
                QuantityInStorage = productContract.QuantityInStorage
            };
        }

        public static Customer ToEntity(this CustomerContract customerContract)
        {
            return new Customer
            {
                Id = customerContract.Id,
                FirstName = customerContract.FirstName,
                LastName = customerContract.LastName,
                Adress = customerContract.Adress,
                City = customerContract.City,
                ZipCode = customerContract.ZipCode
            };
        }

        public static Order ToEntity(this OrderContract orderContract)
        {
            return new Order
            {
                Id = orderContract.Id,
                Sent = orderContract.Sent,
                Billed = orderContract.Billed,
                SentDate = orderContract.SentDate,
                CustomerId = orderContract.CustomerId,
                BilledDate = orderContract.BilledDate,
                TotalPrice = orderContract.TotalPrice,
                OrderedDate = orderContract.OrderedDate,
                OrderLines = orderContract.OrderLines.ToList().ToEntities(),
            };
        }

        public static OrderLine ToEntity(this OrderLineContract orderLineContract)
        {
            return new OrderLine
            {
                Id = orderLineContract.Id,
                Quantity = orderLineContract.Quantity,
                ProductName = orderLineContract.ProductName,
                PricePerProduct = orderLineContract.PricePerProduct,
            };
        }

        #endregion

        #region List

        public static List<Product> ToEntities(this List<ProductContract> productContracts)
        {
            return productContracts.ConvertAll(x => new Product
            {
                Id = x.Id,
                Name = x.Name,
                Price = x.Price,
                ImageUrl = x.ImageUrl,
                QuantityInStorage = x.QuantityInStorage
            });
        }

        public static List<Customer> ToEntities(this List<CustomerContract> customerContracts)
        {
            return customerContracts.ConvertAll(x => new Customer
            {
                Id = x.Id,
                FirstName = x.FirstName,
                LastName = x.LastName,
                Adress = x.Adress,
                City = x.City,
                ZipCode = x.ZipCode
            });
        }

        public static List<Order> ToEntities(this List<OrderContract> orderContracts)
        {
            return orderContracts.ConvertAll(x => new Order
            {
                Id = x.Id,
                Sent = x.Sent,
                Billed = x.Billed,
                SentDate = x.SentDate,
                CustomerId = x.CustomerId,
                BilledDate = x.BilledDate,
                TotalPrice = x.TotalPrice,
                OrderedDate = x.OrderedDate,
                OrderLines = x.OrderLines.ToList().ToEntities(),
            });
        }

        public static List<OrderLine> ToEntities(this List<OrderLineContract> orderLineContracts)
        {
            return orderLineContracts.ConvertAll(x => new OrderLine
            {
                Id = x.Id,
                Quantity = x.Quantity,
                ProductName = x.ProductName,
                PricePerProduct = x.PricePerProduct,
            });
        }

        #endregion

        #endregion

    }
}