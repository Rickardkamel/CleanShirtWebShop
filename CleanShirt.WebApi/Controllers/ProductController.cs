using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using CleanShirt.WebApi.Contracts;
using CleanShirt.WebApi.DataService;
using CleanShirt.WebApi.Handlers;

namespace CleanShirt.WebApi.Controllers
{
    public class ProductController : ApiController
    {
        private readonly ProductHandler _productHandler;

        public ProductController()
        {
            _productHandler = new ProductHandler(new DataContext());
        }

        public IEnumerable<ProductContract> Get()
        {
            return _productHandler.Get();
        }

        public IHttpActionResult Get(int id)
        {
            var product = _productHandler.Get(id);
            return product == null ? (IHttpActionResult)NotFound() : Ok(product);
        }

        // NOT BEING USED ATM TODO: CHECK IF WE NEED POST/DELETE
        public IHttpActionResult Post(ProductContract productContract)
        {
            _productHandler.Post(productContract);
            return Ok();
        }

        public IHttpActionResult Delete(int id)
        {
            _productHandler.Delete(id);
            return Ok();
        }
    }
}
