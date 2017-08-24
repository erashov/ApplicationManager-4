using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace ApplicationManager.DAL.Entites
{
    [Table("Chanels")]
   public class ChanelEntity
    {
        [Key]
        public int ChanelId { get; set; }

        [Required]
        public string Code { get; set; }

        [Required]
        public string AddressNode { get; set; }
    }
}
