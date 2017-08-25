using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ApplicationManager.DAL.Entites
{
    [Table("Equipments")]
    public class EquipmentEntity
    {
        [Key]
        public int EquipmentId { get; set; }

        [Required]
        public string EquipmentName { get; set; }

        public string SerialNumber { get; set; }

        public string Port { get; set; }

        public string Position { get; set; }

        public string Cross { get; set; }

        public string Comment { get; set; }

        public int? ChanelId { get; set; }

        public virtual ChanelEntity Chanel { get; set; }

        public int? ApplicationId { get; set; }

        public virtual ApplicationEntiry Application { get; set; }
    }
}
