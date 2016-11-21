using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Migrations;
using System.Linq;
using System.Linq.Expressions;
using System.Web;

namespace CleanShirt.WebApi.DataService.Repository
{
    public class GenericRepository<TEntity> where TEntity : class
    {
        private readonly DataContext _db;
        private readonly DbSet<TEntity> _dbSet;

        public GenericRepository(object db)
        {
            _db = (DataContext)db;
            _dbSet = _db.Set<TEntity>();
        }

        public IEnumerable<TEntity> Get(
            Expression<Func<TEntity, bool>> filter = null,
            Func<IQueryable<TimeSpan>, IOrderedQueryable<TEntity>> orderBy = null,
            string includeProperties = ""
            )
        {
            IQueryable<TEntity> query = _dbSet;
            if (filter != null)
                query = query.Where(filter);
            query = includeProperties.Split(new[] { ',' }, StringSplitOptions.RemoveEmptyEntries).Aggregate(query, (current, includeProperty) => current.Include(includeProperty));

            return query.ToList();
        }

        public TEntity Get(int id)
        {
            return _dbSet.Find(id);
        }

        public List<TEntity> GetAll()
        {
            return _dbSet.ToList();
        }

        public void Delete(int id)
        {
            _dbSet.Remove(_dbSet.Find(id));
            SaveChanges();
        }

        public void Delete(TEntity entity)
        {
            _dbSet.Remove(entity);
            SaveChanges();
        }

        public TEntity CreateOrUpdate(TEntity entity)
        {
            _dbSet.AddOrUpdate(entity);
            SaveChanges();
            return entity;
        }

        public void SaveChanges()
        {
            _db.SaveChanges();
        }
    }
}