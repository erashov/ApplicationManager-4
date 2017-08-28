using ApplicationManager.Repository.Abstract;
using System;
using System.Collections.Generic;
using System.Text;
using ApplicationManager.DAL.Entites;
using System.Linq;
using ApplicationManager.DAL;
using Microsoft.EntityFrameworkCore;

namespace ApplicationManager.Repository.Concrete
{
    public class GroupRepository : IGroupRepository
    {
        private readonly AppDbContext _appContext;
        public GroupRepository(AppDbContext appContext)
        {
            _appContext = appContext;
        }
        public GroupEntity Add(GroupEntity entity)
        {
            throw new NotImplementedException();
        }

        public IQueryable<GroupEntity> Find()
        {
            throw new NotImplementedException();
        }

        public GroupEntity FindById(int id)
        {
            throw new NotImplementedException();
        }

        public GroupEntity FindByUserName(string userName)
        {
            return _appContext.Users.Include(c => c.Group).FirstOrDefault(u => u.Email == userName).Group;
        }

        public IQueryable<GroupEntity> FindPage(int page, int pageSize)
        {
            throw new NotImplementedException();
        }

        public GroupEntity Remove(GroupEntity entity)
        {
            throw new NotImplementedException();
        }

        public GroupEntity Update(GroupEntity entity)
        {
            throw new NotImplementedException();
        }
    }
}
