﻿using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Models
{
    [Table("Category")]
    public class Category
    {
        [Key]
        public long Id { get; set; }
        [Required]
        public string Name { get; set; }
    }
}
