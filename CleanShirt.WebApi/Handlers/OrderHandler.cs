using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using CleanShirt.WebApi.DataService;
using CleanShirt.WebApi.DataService.UnitOfWork;
using CleanShirt.WebApi.Mappers;
using Contracts;
using Microsoft.ServiceBus.Messaging;
using Newtonsoft.Json;

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

        public List<OrderContract> GetWareHouseOrders()
        {
            return _uow.OrderRepository.GetAll().Where(x => x.Billed).ToList().ToContracts();
        }

        public IEnumerable<OrderContract> GetCompletedOrders()
        {
            return _uow.OrderRepository.GetAll().Where(x => x.Sent).ToList().ToContracts();
        }

        public IEnumerable<ReportContract> GetOrderReport(ReportDatesContact reportContract)
        {
            var reportSummary = _uow.OrderRepository.GetAll()
                .Where(x => x.BilledDate >= reportContract.FromDate && x.BilledDate <= reportContract.ToDate)
                .SelectMany(c => c.OrderLines)
                .GroupBy(p => p.ProductName)
                .Select(a => new ReportContract
                {
                    Price = a.Sum(b => b.PricePerProduct * b.Quantity),
                    Quantity = a.Sum(q => q.Quantity),
                    ProductName = a.Key
                }).ToList();

            return reportSummary;
        }

        public OrderContract Get(int id)
        {
            return _uow.OrderRepository.Get(id).ToContract();
        }

        public OrderContract Post(OrderContract orderContract, string queueType)
        {
            OrderContract order;
            if (orderContract.Id != 0)
            {
                if (orderContract.Billed == false)
                {
                    orderContract.BilledDate = null;
                }
                if (orderContract.Sent == false)
                {
                    orderContract.SentDate = null;
                }

                order = _uow.OrderRepository.CreateOrUpdate(orderContract.ToEntity()).ToContract();
                SendInput(order.Id.ToString(), queueType);
                return order;
            }


            // set date to today, TODO: set null on billeddate & sentdate
            orderContract.OrderedDate = DateTime.Now;
            orderContract.BilledDate = null;
            orderContract.SentDate = null;

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

            order = _uow.OrderRepository.CreateOrUpdate(orderContract.ToEntity()).ToContract();
            SendInput(order.Id.ToString(), queueType);
            return order;
        }



        public bool SendInput(string message, string queueType)
        {
            var connectionString = "Endpoint=sb://cleanshirtws.servicebus.windows.net/;SharedAccessKeyName=RootManageSharedAccessKey;SharedAccessKey=t205ZpBJEI6Z09afJgxm10Ed5qFbGA2QC6tDq65iLP0=";
            var queueName = queueType;

            try
            {
                var client = QueueClient.CreateFromConnectionString(connectionString, queueName);

                var messageToSend = new BrokeredMessage(message) { ContentType = "text/plain" };

                client.Send(messageToSend);

                return true;
            }
            catch
            {
                return false;
            }
        }

        public void Delete(int id)
        {
            _uow.OrderRepository.Delete(id);
        }
    }
}