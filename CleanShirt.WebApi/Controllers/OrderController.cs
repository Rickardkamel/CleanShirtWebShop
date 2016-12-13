using System;
using System.Collections.Generic;
using System.Web.Http;
using CleanShirt.WebApi.DataService;
using CleanShirt.WebApi.Handlers;
using Contracts;
using Microsoft.ServiceBus.Messaging;

namespace CleanShirt.WebApi.Controllers
{
    public class OrderController : ApiController
    {
        private readonly OrderHandler _orderHandler;

        public OrderController()
        {
            _orderHandler = new OrderHandler(new DataContext());
        }

        [System.Web.Http.HttpGet]
        public IEnumerable<OrderContract> Get()
        {
            return _orderHandler.Get();
        }

        [HttpGet]
        [Route("api/order/warehouseorders")]
        public IEnumerable<OrderContract> GetWareHouseOrders()
        {
            return _orderHandler.GetWareHouseOrders();
        }

        [HttpGet]
        [Route("api/order/GetCompletedOrders")]
        public IEnumerable<OrderContract> GetCompletedOrders()
        {
            return _orderHandler.GetCompletedOrders();
        }

        [HttpPost]
        [Route("api/order/GetOrderReport")]
        public IEnumerable<ReportContract> GetOrderReport(ReportDatesContact reportContract)
        {
            return _orderHandler.GetOrderReport(reportContract);
        }

        [Route("api/order/{id}")]
        [HttpGet]
        public OrderContract Get([FromUri] int id)
        {
            var order = _orderHandler.Get(id);
            return order;
        }

        [HttpPost]
        [Route("api/order/{queueType}")]
        public IHttpActionResult Post([FromBody] OrderContract orderContract, [FromUri] string queueType)
        {
            var order = _orderHandler.Post(orderContract, queueType);
            return order != null ? (IHttpActionResult) Ok(order) : BadRequest();
        }


        [HttpGet]
        [Route("api/order/GetNewOrders/{queueType}")]
        public IHttpActionResult GetNewOrders(string queueType)
        {
            var connectionString = "Endpoint=sb://cleanshirtws.servicebus.windows.net/;SharedAccessKeyName=RootManageSharedAccessKey;SharedAccessKey=t205ZpBJEI6Z09afJgxm10Ed5qFbGA2QC6tDq65iLP0=";
            var queueName = queueType;

            var idToSend = "";
            var client = QueueClient.CreateFromConnectionString(connectionString, queueName);

            var brokeredMessage = client.Receive(TimeSpan.FromSeconds(10));

            if (brokeredMessage != null)
            {
                idToSend = brokeredMessage.GetBody<String>();
                brokeredMessage.Complete();
            }

            return Ok(idToSend);
        }

        [HttpGet]
        [Route("api/order/ClearMessages/{queueType}")]
        public IHttpActionResult ClearMessages(string queueType)
        {
            var connectionString = "Endpoint=sb://cleanshirtws.servicebus.windows.net/;SharedAccessKeyName=RootManageSharedAccessKey;SharedAccessKey=t205ZpBJEI6Z09afJgxm10Ed5qFbGA2QC6tDq65iLP0=";
            var queueName = queueType;

            var client = QueueClient.CreateFromConnectionString(connectionString, queueName);
            
            var brokeredMessage = client.Receive(TimeSpan.Zero);

            while (brokeredMessage != null)
            {
                brokeredMessage.Complete();
                brokeredMessage = client.Receive(TimeSpan.Zero);
            }

            return Ok();
        }

        // TODO: CHECK IF WE NEED DELETE
        public IHttpActionResult Delete(int id)
        {
            _orderHandler.Delete(id);
            return Ok();
        }
    }
}
