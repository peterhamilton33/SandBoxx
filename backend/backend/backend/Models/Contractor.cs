using System.ComponentModel.DataAnnotations;

namespace ContractorFinder.Models
{
    public class Contractor
    {
        [Key]
        public int ContractorId { get; set; }

        [Required]
        public string ContractorName { get; set; }

        [Required]
        public string ContractorLocation { get; set; }

        [Required]
        public string ContractorIndustry { get; set; }

        [Required]
        public string ContractorPhoneNumber { get; set; }

        public string ContractorReview { get; set; }

        public string ContractorCoverPhoto { get; set; } // Store as a URL path
    }
}