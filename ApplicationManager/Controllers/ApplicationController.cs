using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ApplicationManager.Repository;
using ApplicationManager.DAL.Entites;
using ApplicationManager.Model.BaseView;
using ApplicationManager.Model.ApplicationViewModels;

namespace ApplicationManager.Controllers
{
    [Route("api/[controller]")]
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

        [HttpGet,Route("get")]
        public async Task<PagingModelView<ApplicationView>> Get(int page, int pageSize, string sort, string order)
        {
            var t1 = Task.Run(() => _application.FindPage(page+1, pageSize));
            var t2 = Task.Run(() => _application.Find().Count());

            await Task.WhenAll(t1, t2);
            return new PagingModelView<ApplicationView>() {
                Items = t1.Result.Select(c=>
                new ApplicationView() {
                    ApplicationId =c.ApplicationId,
                    Address =c.Address,
                    NumML =c.NumML,
                    ApplicationStatusId =c.ApplicationStatusId,
                    StatusName =c.ApplicationStatus.StatusName,
                    DistrictId =c.DistrictId,
                    DistrictName =c.District.DistrictName,
                    CreateDate =c.CreateDate,
                    EndDate =c.EndDate
                }),
                Total_Count = t2.Result };
        }

        [HttpGet,Route("getpage")]
        public IQueryable<ApplicationEntiry> GetPage(int page, int pageSize) => _application.FindPage(page, pageSize);

        [HttpGet,Route("getAll")]
        public IQueryable<ApplicationEntiry> GetAll() => _application.Find();

        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        [HttpPost]
        public void Post([FromBody]ApplicationEntiry value)
        {
            _application.Add(value);
        }

        [HttpPut()]
        public ApplicationEntiry Put([FromBody]ApplicationEntiry value)
        {
            return _application.Update(value);
        }

        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
