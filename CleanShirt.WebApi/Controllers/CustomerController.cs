using System.Collections.Generic;
using System.Web.Http;
using CleanShirt.WebApi.DataService;
using CleanShirt.WebApi.Handlers;
using Contracts;

namespace CleanShirt.WebApi.Controllers
{
    public class CustomerController : ApiController
    {
        private readonly CustomerHandler _customerHandler;

        public CustomerController()
        {
            _customerHandler = new CustomerHandler(new DataContext());
        }

        public IEnumerable<CustomerContract> Get()
        {
            return _customerHandler.Get();
        }

        public CustomerContract Get(int id)
        {
            var customer = _customerHandler.Get(id);
            return customer;
        }

        public IHttpActionResult Post(CustomerContract customerContract)
        {
            _customerHandler.Post(customerContract);
            return Ok();
        }

        // TODO: CHECK IF WE NEED DELETE
        public IHttpActionResult Delete(int id)
        {
            _customerHandler.Delete(id);
            return Ok();
        }
    }
}
