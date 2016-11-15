using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using CleanShirt.WebApi.DataService.Repository;
using CleanShirt.WebApi.DBModels;

namespace CleanShirt.WebApi.DataService.UnitOfWork
{
    public class UnitOfWork
    {
        private readonly object _db;

        private GenericRepository<Product> _productRepository;
        private GenericRepository<Customer> _customerRepository;
        private GenericRepository<Order> _orderRepository;

        public UnitOfWork(object db)
        {
            _db = db;
        }

        public GenericRepository<Product> ProductRepository => _productRepository ?? (_productRepository = new GenericRepository<Product>(_db));
        public GenericRepository<Customer> CustomerRepository => _customerRepository ?? (_customerRepository = new GenericRepository<Customer>(_db));
        public GenericRepository<Order> OrderRepository => _orderRepository ?? (_orderRepository = new GenericRepository<Order>(_db));
    }
}