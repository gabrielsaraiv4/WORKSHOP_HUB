namespace WorkshopApi.Models.DTO
{
    public class DashboardDto
    {
        public int TotalWorkshops { get; set; }
        public int TotalColaboradores { get; set; }
        public int TotalAtas { get; set; }
    }

    public class DeptStatsDto
    {
        public string Departamento { get; set; } = string.Empty;
        public int Quantidade { get; set; }
    }
}