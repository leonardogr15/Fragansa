namespace AnimeManager.Domain;

public class Genre
{
    public int GenreId { get; set; }
    public string Name { get; set; } = null!;
    public ICollection<Movie> Movies { get; set; } = new List<Movie>();
}
