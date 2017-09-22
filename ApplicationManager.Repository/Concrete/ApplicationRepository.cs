using System;
using System.Linq;
using ApplicationManager.DAL;
using ApplicationManager.DAL.Entites;
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

        public IQueryable<ApplicationEntiry> Find(string filter)
        {
            if (string.IsNullOrWhiteSpace(filter) || filter?.Length < 3)
            {
                return _appContext.Applications.Include(c => c.ApplicationStatus).Include(c => c.District);
            }
            else
            {
                return _appContext.Applications.Include(c => c.ApplicationStatus).Include(c => c.District).Where(a => a.Address.Contains(filter));
            }
        }

        public ApplicationEntiry FindById(int id)
        {
            return _appContext.Applications.Include(c => c.ApplicationStatus)
                .Include(c => c.District)
                .Include(c => c.Equipments)
                .Include(c => c.Group)
                .FirstOrDefault(a => a.ApplicationId == id);
        }

        public IQueryable<ApplicationEntiry> FindPage(int page, int pageSize, string sort, string order, string filter)
        {

            return Find(filter).OrderByDescending(i => i.ApplicationId).Skip(pageSize * (page - 1)).Take(pageSize).AsNoTracking();
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