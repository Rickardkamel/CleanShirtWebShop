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
    public class CustomerHandler
    {
        private readonly UnitOfWork _uow;
        public CustomerHandler(object dataContext)
        {
            _uow = new UnitOfWork((DataContext)dataContext);
        }

        public List<CustomerContract> Get()
        {
            return _uow.CustomerRepository.GetAll().ToContracts();
        }

        public CustomerContract Get(int id)
        {
            return _uow.CustomerRepository.Get(id).ToContract();
        }

        public void Post(CustomerContract customerContract)
        {
            _uow.CustomerRepository.CreateOrUpdate(customerContract.ToEntity());
        }

        public void Delete(int id)
        {
            _uow.CustomerRepository.Delete(id);
        }
    }
}