using System;

namespace Domain.Models
{
    public class Session
    {
        public string Token { get; set; }
        public DateTime Expiration { get; set; }
    }
}
