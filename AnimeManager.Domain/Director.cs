namespace AnimeManager.Domain
{
    public class Director
    {
        public int DirectorId  { get; set; }
        public string FirstName { get; set; } = null!;
        public string LastName  { get; set; } = null!;
        public int CountryId    { get; set; }
        public Country Country  { get; set; } = null!;
        public ICollection<Movie> Movies { get; set; } = new List<Movie>();
    }
}


