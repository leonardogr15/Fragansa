namespace AnimeManager.Domain;

public class Country
{
    public int CountryId { get; set; }
    public string Name { get; set; } = null!;
    public ICollection<Director> Directors { get; set; } = new List<Director>();
    public ICollection<Actor> Actors       { get; set; } = new List<Actor>();
    public ICollection<Movie> Movies       { get; set; } = new List<Movie>();
}
