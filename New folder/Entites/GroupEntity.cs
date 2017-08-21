using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ApplicationManager.DAL.Entites
{
    [Table("Groups")]
    public class GroupEntity
    {
        [Key]
        public int GroupId { get; set; }
        [Required]
        public string GroupName { get; set; }
    }
}