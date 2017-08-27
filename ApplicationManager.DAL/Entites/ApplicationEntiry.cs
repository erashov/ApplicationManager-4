using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace ApplicationManager.DAL.Entites
{
    [Table("Applications")]
    public class ApplicationEntiry
    {
        [Key]
        public int ApplicationId { get; set; }

        public int NumML { get; set; }

        [Required]
        public string Address { get; set; }

        public int? DistrictId { get; set; }

        public virtual DistrictEntity District { get; set; }

        public int ApplicationStatusId { get; set; }

        public virtual ApplicationStatusEntity ApplicationStatus { get; set; }

        public DateTime? CreateDate { get; set; }

        public DateTime? EndDate { get; set; }

       // public int? EquipmentId { get; set; }

        public List<EquipmentEntity> Equipments { get; set; }
        public int? GroupId { get; set; }
        public GroupEntity Group { get; set; }
    }
}