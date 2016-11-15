using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CleanShirt.WebApi.DataService.UnitOfWork
{
    public class UnitOfWork
    {
        private readonly object _db;

        //private GenericRepository<ClassName> _classNameRepository;

        public UnitOfWork(object db)
        {
            _db = db;
        }

        //public GenericRepository<ClassName> ClassNameRepository => _classNameRepository ?? (_classNameRepository = new GenericRepository<ClassName>(_db));
    }
}