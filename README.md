# Catálogo de Cursos CTED - Desafio SESI

Aplicação web completa desenvolvida para apresentação, pesquisa e filtragem de um catálogo de cursos educacionais. O projeto conta com back-end em C# (.NET 8.0 Web API) integrado a um banco de dados SQLite e front-end responsivo desenvolvido em HTML, CSS e JavaScript puro.

---

## 1. Objetivo da Aplicação
Proporcionar aos usuários uma interface simples, acessível e intuitiva para consultar cursos disponíveis, permitindo pesquisas por nome e filtros combinados por Categoria, Modalidade e Status, além de possibilitar a visualização detalhada de cada curso em uma janela modal centralizada.

---

## 2. Tecnologias Utilizadas
- **Back-end:** C# / ASP.NET Core Web API (.NET 8.0)
- **Persistência de Dados:** Entity Framework Core com provedor SQLite
- **Documentação de API:** Swashbuckle (Swagger UI)
- **Front-end:** HTML5, CSS3 (Modern Flexbox & Grid) e JavaScript Vanilla (ES6+)
- **Conteinerização e Deploy:** Docker, Render (Back-end Web Service) e GitHub Pages (Front-end)

---

## 3. Arquitetura da Solução
A solução adota uma arquitetura em camadas desacopladas com separação clara entre Front-end e Back-end:
- **Front-end (Client):** Aplicação estática servida via GitHub Pages que consome endpoints REST via `fetch` assíncrono. Possui camada de *fallback* local para simulação de dados em caso de instabilidade ou suspensão do servidor gratuito.
- **Back-end (Server):** Web API em C# rodando em container Docker no Render, estruturada nos padrões MVC/Controller, gerenciando regras de busca e filtros diretamente no banco de dados.
- **Banco de Dados:** Banco relacional leve SQLite mantido via ORM (Entity Framework Core).

---

## 4. Estrutura das Pastas

```text
Desafio Sesi/
├── backend/
│   ├── Controllers/
│   │   └── CursosController.cs      # Endpoints da API e regras de filtro
│   ├── Models/
│   │   └── Curso.cs                 # Entidade e modelo de dados
│   ├── AppDbContext.cs              # Contexto do EF Core e Seed Data
│   ├── Program.cs                   # Configurações de serviços, CORS e middlewares
│   ├── backend.csproj               # Dependências do projeto C# (.NET 8.0)
│   ├── Dockerfile                   # Script de compilação e execução da imagem Docker
│   └── cursos.db                    # Arquivo do banco de dados SQLite
├── frontend/
│   ├── index.html                   # Estrutura semântica e acessível do catálogo
│   ├── styles.css                   # Estilização responsiva e posicionamento do modal
│   └── script.js                    # Consumo da API, filtros e manipulação do DOM
├── index.html                       # Redirecionador automático para o GitHub Pages
├── .gitignore                       # Ignora binários, pastas de build e bancos locais
├── README.md                        # Documentação técnica principal
└── USO_DE_IA.md                     # Registro do uso de Inteligência Artificial