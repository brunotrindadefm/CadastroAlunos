using Microsoft.EntityFrameworkCore;
using backend.Context;
using DotNetEnv;

var builder = WebApplication.CreateBuilder(args);

Env.Load();

// Obter a string de conexão da variável de ambiente
var connectionString = Environment.GetEnvironmentVariable("DB_CONNECTION_STRING");

// Verificando se a string do .env não está vazia
if (string.IsNullOrEmpty(connectionString)) throw new InvalidOperationException("Não foi fornecida a string de conexão");

// Configurando o DbContext com a string de conexão
builder.Services.AddDbContext<ApplicationDbContext>(options => options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString))); 

builder.Services.AddControllers();

var app = builder.Build();

// Configurar o pipeline de solicitação HTTP
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage(); // Para exibir erros detalhados no desenvolvimento
}
else
{
    app.UseExceptionHandler("/Home/Error"); // Página de erro genérica para produção
    app.UseHsts(); // HSTS para segurança
}

app.UseHttpsRedirection(); // Redireciona HTTP para HTTPS
app.UseStaticFiles(); // Permite servir arquivos estáticos
app.UseRouting(); // Habilita o roteamento
app.UseCors(options => options.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader()); // Habilitando o cors, para diferentes domínios   
app.UseAuthorization(); // Adiciona autorização

app.MapControllers(); // Mapeia os endpoints dos controladores

app.Run();