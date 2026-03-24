using Microsoft.EntityFrameworkCore;
using WorkshopApi.Data;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Registro do Contexto do Banco de Dados
builder.Services.AddDbContext<AppDbContext>(options => {
    options.UseSqlite("Data Source=workshop.db");
});

// Configuração do CORS para o Angular
builder.Services.AddCors(options => {
    options.AddPolicy("AllowAngular", policy => {
        policy.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();
    });
});

var app = builder.Build();

if (app.Environment.IsDevelopment()) {
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors("AllowAngular");
app.UseAuthorization();
app.MapControllers();

app.Run();