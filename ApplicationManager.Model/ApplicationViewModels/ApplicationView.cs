using System;

namespace ApplicationManager.Model.ApplicationViewModels
{
    public class ApplicationView
    {
        public int ApplicationId { get; set; }
        public int NumML { get; set; }
        public string Address { get; set; }
        public int? DistrictId { get; set; }
        public string DistrictName { get; set; }
        public int? ApplicationStatusId { get; set; }
        public string StatusName { get; set; }
        public DateTime? CreateDate { get; set; }
        public DateTime? EndDate { get; set; }
        public int? GroupId { get; set; }
        public string GroupName { get; set; }
    }
}
