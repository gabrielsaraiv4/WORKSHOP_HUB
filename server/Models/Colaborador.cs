using System.Text.Json.Serialization;

namespace WorkshopApi.Models {
    public class Colaborador {
        public int Id { get; set; }
        public string Nome { get; set; } = string.Empty;

        [JsonIgnore]
        public ICollection<Workshop> Workshops { get; set; } = new List<Workshop>();
    }
}