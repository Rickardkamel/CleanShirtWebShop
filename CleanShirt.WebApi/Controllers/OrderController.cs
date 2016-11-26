using System.Collections.Generic;
using System.Web.Http;
using CleanShirt.WebApi.DataService;
using CleanShirt.WebApi.Handlers;
using Contracts;

namespace CleanShirt.WebApi.Controllers
{
    public class OrderController : ApiController
    {
        private readonly OrderHandler _orderHandler;

        public OrderController()
        {
            _orderHandler = new OrderHandler(new DataContext());
        }

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

        public OrderContract Get(int id)
        {
            var order = _orderHandler.Get(id);
            return order;
        }

        public IHttpActionResult Post(OrderContract orderContract)
        {
            var x = _orderHandler.Post(orderContract);
            return x != null ? (IHttpActionResult) Ok() : BadRequest();
        }

        // TODO: CHECK IF WE NEED DELETE
        public IHttpActionResult Delete(int id)
        {
            _orderHandler.Delete(id);
            return Ok();
        }
    }
}
