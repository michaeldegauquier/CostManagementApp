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
        public double Price { get; set; }
        [Required]
        public bool Paid { get; set; }

        //User
        public string UserId { get; set; }
        public User User { get; set; }

        //Category
        public long? CategoryId { get; set; }
        public virtual Category Category { get; set; }
    }
}
