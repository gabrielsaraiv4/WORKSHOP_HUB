namespace WorkshopApi.Models
{
    public class Colaborador
    {
        public int Id { get; set; }
        public string Nome { get; set; } = string.Empty;
        public ICollection<Workshop> Workshops { get; set; } = new List<Workshop>();
    }
}