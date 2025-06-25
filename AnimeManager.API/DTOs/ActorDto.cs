using System.ComponentModel.DataAnnotations;

namespace AnimeManager.API.DTOs
{
    public class ActorDto
    {
        [Required]
        public string FirstName { get; set; }

        [Required]
        public string LastName { get; set; }

        [Required]
        public int CountryId { get; set; }
    }
}