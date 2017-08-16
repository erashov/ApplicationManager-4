using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace ApplicationManager.DAL.Entites
{
    [Table("Districts")]
    public class DistrictEntity
    {
        [Key]
        public int DistrictId { get; set; }
        [Required]
        public string DistrictName { get; set; }
    }
}