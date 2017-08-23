using System;
using System.Linq;
using ApplicationManager.DAL.Entites;
using ApplicationManager.DAL;
using Microsoft.EntityFrameworkCore;
namespace ApplicationManager.Repository.Concrete
{
    public class ApplicationRepository : IBaseRepository<ApplicationEntiry>
    {
        private readonly AppDbContext _appContext;
        public ApplicationRepository(AppDbContext appContext)
        {
            _appContext = appContext;
        }
        public ApplicationEntiry Add(ApplicationEntiry entity)
        {
            _appContext.Applications.Add(entity);
            _appContext.SaveChanges();
            return entity;
        }

        public IQueryable<ApplicationEntiry> Find()
        {
            return _appContext.Applications.Include(c => c.ApplicationStatus).Include(c => c.District);
        }

        public ApplicationEntiry FindById(int id)
        {
            throw new NotImplementedException();
        }

        public IQueryable<ApplicationEntiry> FindPage(int page, int pageSize)
        {
            return Find().OrderByDescending(i => i.ApplicationId).Skip(pageSize * (page - 1)).Take(pageSize);
        }

        public ApplicationEntiry Remove(ApplicationEntiry entity)
        {
            throw new NotImplementedException();
        }

        public ApplicationEntiry Update(ApplicationEntiry entity)
        {
            _appContext.Applications.Attach(entity);
            _appContext.Entry(entity).State = EntityState.Modified;
            _appContext.SaveChanges();
            //var app = _appContext.Applications.FirstOrDefault(c => c.ApplicationId == entity.ApplicationId);
            //if (app != null)
            //{
            //    app.Address = entity.Address;
                
            //}

            return entity;
        }
    }
}