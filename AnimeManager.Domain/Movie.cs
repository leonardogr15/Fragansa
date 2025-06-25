namespace AnimeManager.Domain;

public class Movie
{
    public int MovieId    { get; set; }
    public string Title   { get; set; } = null!;
    public string Synopsis { get; set; } = null!;
    public string CoverImageUrl { get; set; } = null!;
    public string TrailerCode   { get; set; } = null!;
    public int GenreId     { get; set; }
    public Genre Genre     { get; set; } = null!;
    public int CountryId   { get; set; }
    public Country Country { get; set; } = null!;
    public int DirectorId  { get; set; }
    public Director Director { get; set; } = null!;
    public ICollection<MovieActor> MovieActors { get; set; } = new List<MovieActor>();
}
