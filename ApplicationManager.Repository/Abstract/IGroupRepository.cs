using ApplicationManager.DAL.Entites;
using System;
using System.Collections.Generic;
using System.Text;

namespace ApplicationManager.Repository.Abstract
{
   public interface IGroupRepository:IBaseRepository<GroupEntity>
    {
        GroupEntity FindByUserName(string userName);
    }
}
