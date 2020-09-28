using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Models
{
    [Table("Product")]
    public class Product
    {
        [Key]
        public long Id { get; set; }
        [DataType(DataType.Date), Required]
        public DateTime DatePurchased { get; set; }
        [Required]
        public string Description { get; set; }
        [Required]
        public bool Paid { get; set; }
    }
}
