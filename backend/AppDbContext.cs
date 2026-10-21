using Microsoft.EntityFrameworkCore;
using backend.Models;

namespace backend.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Curso> Cursos { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Curso>().HasData(
                new Curso
                {
                    Id = 1,
                    NomeCompleto = "Desenvolvimento Web com ASP.NET Core",
                    NomeBreve = "Dev Web ASP.NET",
                    Descricao = "Aprenda a criar APIs RESTful modernas e escaláveis com C# e .NET.",
                    Categoria = "Tecnologia",
                    Modalidade = "EAD",
                    CargaHoraria = 60,
                    PublicoAlvo = "Estudantes e desenvolvedores iniciantes",
                    Status = "Disponível",
                    ImagemUrl = "https://via.placeholder.com/300x200?text=ASP.NET+Core",
                    DataDisponibilizacao = DateTime.Now.AddDays(-30)
                },
                new Curso
                {
                    Id = 2,
                    NomeCompleto = "Fundamentos de Banco de Dados SQL",
                    NomeBreve = "Banco de Dados SQL",
                    Descricao = "Conceitos fundamentais de modelagem, criação de tabelas e consultas SQL.",
                    Categoria = "Tecnologia",
                    Modalidade = "Presencial",
                    CargaHoraria = 40,
                    PublicoAlvo = "Profissionais de TI e entusiastas",
                    Status = "Disponível",
                    ImagemUrl = "https://via.placeholder.com/300x200?text=SQL",
                    DataDisponibilizacao = DateTime.Now.AddDays(-60)
                },
                new Curso
                {
                    Id = 3,
                    NomeCompleto = "Gestão Agil de Projetos com Scrum",
                    NomeBreve = "Scrum e Gestão Ágil",
                    Descricao = "Domine o framework Scrum e otimize a entrega de produtos da sua equipa.",
                    Categoria = "Gestão",
                    Modalidade = "EAD",
                    CargaHoraria = 30,
                    PublicoAlvo = "Gestores, líderes de equipe e Scrum Masters",
                    Status = "Em Breve",
                    ImagemUrl = "https://via.placeholder.com/300x200?text=Scrum",
                    DataDisponibilizacao = DateTime.Now.AddDays(15)
                },
                new Curso
                {
                    Id = 4,
                    NomeCompleto = "UX/UI Design: Interfaces Centradas no Utilizador",
                    NomeBreve = "UX/UI Design",
                    Descricao = "Princípios de experiência do utilizador, prototipagem no Figma e usabilidade.",
                    Categoria = "Design",
                    Modalidade = "EAD",
                    CargaHoraria = 50,
                    PublicoAlvo = "Designers e front-end developers",
                    Status = "Disponível",
                    ImagemUrl = "https://via.placeholder.com/300x200?text=UX+UI",
                    DataDisponibilizacao = DateTime.Now.AddDays(-10)
                },
                new Curso
                {
                    Id = 5,
                    NomeCompleto = "Segurança da Informação no Ambiente Corporativo",
                    NomeBreve = "Segurança da Informação",
                    Descricao = "Boas práticas de segurança, conformidade e proteção contra ameaças digitais.",
                    Categoria = "Tecnologia",
                    Modalidade = "Presencial",
                    CargaHoraria = 20,
                    PublicoAlvo = "Colaboradores e equipes administrativas",
                    Status = "Encerrado",
                    ImagemUrl = "https://via.placeholder.com/300x200?text=Seguranca",
                    DataDisponibilizacao = DateTime.Now.AddDays(-120)
                },
                new Curso
                {
                    Id = 6,
                    NomeCompleto = "Liderança e Comunicação Assertiva",
                    NomeBreve = "Liderança Assertiva",
                    Descricao = "Desenvolva inteligência emocional, escuta ativa e técnicas de feedback.",
                    Categoria = "Gestão",
                    Modalidade = "Presencial",
                    CargaHoraria = 16,
                    PublicoAlvo = "Líderes de equipe e gestores",
                    Status = "Em Breve",
                    ImagemUrl = "https://via.placeholder.com/300x200?text=Lideranca",
                    DataDisponibilizacao = DateTime.Now.AddDays(30)
                }
            );
        }
    }
}