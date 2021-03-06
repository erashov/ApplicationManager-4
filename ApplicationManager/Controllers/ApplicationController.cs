﻿using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using ApplicationManager.Repository;
using ApplicationManager.DAL.Entites;
using ApplicationManager.Model.BaseView;
using ApplicationManager.Model.ApplicationViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication.JwtBearer;

namespace ApplicationManager.Controllers
{
    [Produces("application/json"), Route("api/[controller]"),
     Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)
        ]
    //  [Authorize(Roles = "userRole")]
    public class ApplicationController : Controller
    {
        IBaseRepository<ApplicationEntiry> _application;
        public ApplicationController(IBaseRepository<ApplicationEntiry> application)
        {
            _application = application;
        }

        [HttpGet]
        public IEnumerable<ApplicationEntiry> Get()
        {
            return _application.Find();
        }

        [HttpGet, Route("get")]
        public async Task<PagingModelView<ApplicationView>> Get(int page, int pageSize, string sort, string order, string filter)
        {
            var t1 = Task.Run(() => _application.FindPage(page + 1, pageSize, sort, order, filter));
            var t2 = Task.Run(() => _application.Find(filter).Count());

            await Task.WhenAll(t1, t2);

            return new PagingModelView<ApplicationView>()
            {
                Items = t1.Result.Select(c =>
                new ApplicationView()
                {
                    ApplicationId = c.ApplicationId,
                    Address = c.Address,
                    NumML = c.NumML,
                    ApplicationStatusId = c.ApplicationStatusId,
                    StatusName = c.ApplicationStatus.StatusName,
                    DistrictId = c.DistrictId,
                    DistrictName = c.District.DistrictName,
                    CreateDate = c.CreateDate,
                    EndDate = c.EndDate,
                    GroupName = (c.GroupId != null) ? c.Group.GroupName : string.Empty
                }),
                Total_Count = t2.Result
            };
        }

        [HttpGet, Route("getAll")]
        public IQueryable<ApplicationEntiry> GetAll() => _application.Find();

        [HttpGet("{id}")]
        public ApplicationEntiry Get(int id)
        {
            return _application.FindById(id);
        }

        [HttpPost]
        public void Post([FromBody]ApplicationEntiry value)
        {
            _application.Add(value);
        }

        [HttpPut(), Route("Update")]
        public ApplicationEntiry Update([FromBody]ApplicationChangeStateView value)
        {
            var app = _application.FindById(value.applicationId);
            app.GroupId = value.groupId;
            return _application.Update(app);
        }


        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }

    }
}
