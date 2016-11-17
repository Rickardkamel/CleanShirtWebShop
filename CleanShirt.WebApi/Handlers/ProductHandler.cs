using System;
using System.Collections.Generic;
using CleanShirt.WebApi.Contracts;
using CleanShirt.WebApi.DataService;
using CleanShirt.WebApi.DataService.UnitOfWork;
using CleanShirt.WebApi.Mappers;

namespace CleanShirt.WebApi.Handlers
{
    public class ProductHandler
    {
        private readonly UnitOfWork _uow;
        public ProductHandler(object dataContext)
        {
            _uow = new UnitOfWork((DataContext) dataContext);
        }

        public List<ProductContract> Get()
        {
            return _uow.ProductRepository.GetAll().ToContracts();
        }

        public ProductContract Get(int id)
        {
            return _uow.ProductRepository.Get(id).ToContract();
        }

        public void Post(ProductContract productContract)
        {
            _uow.ProductRepository.CreateOrUpdate(productContract.ToEntity());
        }

        public void Delete(int id)
        {
            _uow.ProductRepository.Delete(id);
        }

    }
}