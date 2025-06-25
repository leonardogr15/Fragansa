namespace AnimeManager.Domain
{
    public class Actor
    {
        public int ActorId    { get; set; }
        public string FirstName { get; set; } = null!;
        public string LastName  { get; set; } = null!;
        public int CountryId    { get; set; }
        public Country Country  { get; set; } = null!;
        public ICollection<MovieActor> MovieActors { get; set; } = new List<MovieActor>();
    }

}

