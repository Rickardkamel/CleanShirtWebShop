using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using CleanShirt.WebApi.DataService;
using CleanShirt.WebApi.DataService.UnitOfWork;
using CleanShirt.WebApi.Mappers;
using Contracts;

namespace CleanShirt.WebApi.Handlers
{
    public class OrderHandler
    {
        private readonly UnitOfWork _uow;
        public OrderHandler(object dataContext)
        {
            _uow = new UnitOfWork((DataContext)dataContext);
        }

        public List<OrderContract> Get()
        {
            return _uow.OrderRepository.GetAll().ToContracts();
        }

        public OrderContract Get(int id)
        {
            return _uow.OrderRepository.Get(id).ToContract();
        }

        public void Post(OrderContract orderContract)
        {
            // set date to today, TODO: set null on billeddate & sentdate
            orderContract.OrderedDate = DateTime.Now;
            orderContract.BilledDate = DateTime.Now;
            orderContract.SentDate = DateTime.Now;

            // Create the costumer
            var customer = _uow.CustomerRepository.CreateOrUpdate(orderContract.Customer.ToEntity());
            orderContract.CustomerId = customer.Id;

            // remove quantity from product

            foreach (var item in orderContract.OrderLines)
            {
                var productFromDb = _uow.ProductRepository.Get(item.ProductId);

                productFromDb.QuantityInStorage = productFromDb.QuantityInStorage - item.Quantity;
                _uow.ProductRepository.CreateOrUpdate(productFromDb);
            }

            _uow.OrderRepository.CreateOrUpdate(orderContract.ToEntity());
        }

        public void Delete(int id)
        {
            _uow.OrderRepository.Delete(id);
        }
    }
}