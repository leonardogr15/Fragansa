namespace AnimeManager.API.DTOs
{
    public class MovieDto
    {
        public int MovieId { get; set; }
        public string Title { get; set; } = null!;
        public string Synopsis { get; set; } = null!;
        public string CoverImageUrl { get; set; } = null!;
        public string TrailerCode { get; set; } = null!;
        public int GenreId { get; set; }
        public string GenreName { get; set; } = null!;
        public int CountryId { get; set; }
        public string CountryName { get; set; } = null!;
        public int DirectorId { get; set; }
        public string DirectorName { get; set; } = null!;
        public int[] ActorIds { get; set; }      // ← nueva propiedad
        public string[] ActorNames { get; set; } // ya tenías esta
    }

    public class MovieSaveDto
    {
        public string Title { get; set; }
        public string Synopsis { get; set; }
        public string CoverImageUrl { get; set; }
        public string TrailerCode { get; set; }

        public int GenreId { get; set; }
        public int CountryId { get; set; }
        public int DirectorId { get; set; }

        public List<int> ActorIds { get; set; } = new();
    }

}
