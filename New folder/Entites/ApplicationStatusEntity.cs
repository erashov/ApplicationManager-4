using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ApplicationManager.DAL.Entites
{
    [Table("ApplicationStatuses")]
    public class ApplicationStatusEntity
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string StatusName { get; set; }
    }
}