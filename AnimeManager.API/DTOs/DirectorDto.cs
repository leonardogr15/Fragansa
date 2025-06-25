using System.ComponentModel.DataAnnotations;

namespace AnimeManager.API.DTOs
{
    public class DirectorDto
    {
        [Required]
        public string FirstName { get; set; }

        [Required]
        public string LastName { get; set; }

        [Required]
        public int CountryId { get; set; }
    }
}
