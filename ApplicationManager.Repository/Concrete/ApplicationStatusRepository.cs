using ApplicationManager.DAL.Entites;
using System;
using System.Linq;
using ApplicationManager.DAL;

namespace ApplicationManager.Repository.Concrete
{
    class ApplicationStatusRepository : IBaseRepository<ApplicationStatusEntity>
    {
        private readonly AppDbContext _appContext;
        public ApplicationStatusRepository(AppDbContext appContext)
        {
            _appContext = appContext;
        }
        public ApplicationStatusEntity Add(ApplicationStatusEntity entity)
        {
            _appContext.ApplicationStatuses.Add(entity);
            _appContext.SaveChanges();
            return entity;
        }

        public IQueryable<ApplicationStatusEntity> Find()
        {
           return _appContext.ApplicationStatuses;
        }

        public IQueryable<ApplicationStatusEntity> Find(string filter)
        {
            throw new NotImplementedException();
        }

        public ApplicationStatusEntity FindById(int id)
        {
            throw new NotImplementedException();
        }

        public IQueryable<ApplicationStatusEntity> FindPage(int page, int pageSize, string sort, string order, string filter)
        {
            throw new NotImplementedException();
        }

        public ApplicationStatusEntity Remove(ApplicationStatusEntity entity)
        {
            throw new NotImplementedException();
        }

        public ApplicationStatusEntity Update(ApplicationStatusEntity entity)
        {
            throw new NotImplementedException();
        }
    }
}
