namespace backend.Models
{
    public class MoodleCursoModel
    {
        public int Id { get; set; }
        public string Shortname { get; set; } = string.Empty;
        public string Fullname { get; set; } = string.Empty;
        public string Summary { get; set; } = string.Empty;
    }
}