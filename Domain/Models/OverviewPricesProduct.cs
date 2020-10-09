namespace Domain.Models
{
    public class OverviewPricesProduct
    {
        public int Month { get; set; }
        public double Price { get; set; } // Total price
        public double PricePaid { get; set; }
        public double PriceToPaid { get; set; }
    }
}
