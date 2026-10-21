# Catálogo de Cursos CTED - Desafio SESI

Aplicação web completa desenvolvida para apresentação, pesquisa e filtragem de um catálogo de cursos educacionais. O projeto conta com back-end em C# (.NET 8.0 Web API) integrado a um banco de dados SQLite e front-end responsivo desenvolvido em HTML, CSS e JavaScript puro.

## 1. Objetivo da Aplicação

Proporcionar aos usuários uma interface simples, acessível e intuitiva para consultar cursos disponíveis, permitindo pesquisas por nome e filtros combinados por Categoria, Modalidade e Status, além de possibilitar a visualização detalhada de cada curso em uma janela modal centralizada.

## 2. Tecnologias Utilizadas

* **Back-end:** C# / ASP.NET Core Web API (.NET 8.0)

* **Persistência de Dados:** Entity Framework Core com provedor SQLite

* **Documentação de API:** Swashbuckle (Swagger UI)

* **Front-end:** HTML5, CSS3 (Modern Flexbox & Grid) e JavaScript Vanilla (ES6+)

* **Conteinerização e Deploy:** Docker, Render (Back-end Web Service) e GitHub Pages (Front-end)

## 3. Arquitetura da Solução

A solução adota uma arquitetura em camadas desacopladas com separação clara entre Front-end e Back-end:

* **Front-end (Client):** Aplicação estática servida via GitHub Pages que consome endpoints REST via `fetch` assíncrono. Possui camada de *fallback* local para simulação de dados em caso de instabilidade ou suspensão do servidor gratuito.

* **Back-end (Server):** Web API em C# rodando em container Docker no Render, estruturada nos padrões MVC/Controller, gerenciando regras de busca e filtros diretamente no banco de dados.

* **Banco de Dados:** Banco relacional leve SQLite mantido via ORM (Entity Framework Core).

## 4. Estrutura das Pastas

```
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

```

## 5. Instruções para Execução Local

### Pré-requisitos

* [.NET 8.0 SDK](https://dotnet.microsoft.com/download/dotnet/8.0) instalado.

### Passo a Passo:

1. **Clonar o Repositório:**

   ```
   git clone https://github.com/brunorocha7/catalogo-cursos-cted.git
   cd catalogo-cursos-cted
   
   ```

2. **Executar o Back-end (API C#):**

   ```
   cd backend
   dotnet run
   
   ```

   A API estará rodando em `http://localhost:5092`. A documentação Swagger pode ser acessada em `http://localhost:5092/swagger`.

3. **Executar o Front-end:**
   Navegue até a pasta `frontend` e abra o arquivo `index.html` em qualquer navegador web (ou utilize a extensão Live Server do VS Code).

## 6. Configuração do Banco de Dados

O banco de dados **SQLite** (`cursos.db`) é configurado e inicializado automaticamente pelo Entity Framework Core na inicialização da aplicação (`AppDbContext.cs`).

Caso o arquivo do banco não exista, o EF Core cria a estrutura de tabelas e popula a base com 6 cursos iniciais de exemplo (*Seed Data*).

## 7. Endpoints da API

| Método | Rota | Descrição | Parâmetros Opcionais (Query) | 
| ----- | ----- | ----- | ----- | 
| `GET` | `/api/cursos` | Lista cursos cadastrados com suporte a filtros combinados. | `nome`, `categoria`, `modalidade`, `status` | 
| `GET` | `/api/cursos/{id}` | Retorna os detalhes completos de um curso pelo ID. | `id` (na URL) | 

## 8. Modelo de Dados (`Curso`)

| Campo | Tipo C# | Descrição | 
| ----- | ----- | ----- | 
| `Id` | `int` | Chave primária (identificador único). | 
| `NomeCompleto` | `string` | Nome oficial e extenso do curso. | 
| `NomeBreve` | `string` | Título simplificado para exibição nos cartões. | 
| `Descricao` | `string` | Resumo detalhado do conteúdo do curso. | 
| `Categoria` | `string` | Área de conhecimento (ex: Tecnologia, Gestão, Design). | 
| `Modalidade` | `string` | Tipo de oferta (ex: EAD, Presencial). | 
| `CargaHoraria` | `int` | Duração em horas. | 
| `PublicoAlvo` | `string` | Perfil do aluno indicado. | 
| `Status` | `string` | Situação do curso (Disponível, Em Breve, Encerrado). | 
| `ImagemUrl` | `string` | Link para a imagem de capa do curso. | 
| `DataDisponibilizacao` | `DateTime` | Data em que o curso foi disponibilizado. | 

## 9. Estratégia de Responsividade

* **CSS Grid e Flexbox:** Utilização de `grid-template-columns: repeat(auto-fill, minmax(280px, 1fr))` no catálogo, permitindo ajuste fluido entre telas de smartphones, tablets e monitores desktop.

* **Modal Centralizado:** A janela de detalhes utiliza `position: fixed` com `viewport units` (`100vw`/`100vh`) e `display: flex` para garantir alinhamento central em qualquer resolução sem corte de conteúdo.

## 10. Decisões de Acessibilidade

* **HTML Semântico:** Utilização de tags como `<header>`, `<main>`, `<section>`, `<article>` e `<nav>`.

* **Atributos ARIA:** Uso de `aria-label` nos campos de entrada/filtros, e `role="dialog"`, `aria-modal="true"`, `aria-hidden` no modal de detalhes.

* **Navegação e Contraste:** Relação de contraste adequada para leitura das badges de status e botões interativos com estados de hover definidos.

## 11. Processo de Publicação

* **Front-end:** Publicado no **GitHub Pages** a partir da ramificação `main` acessível pela URL pública: `https://brunorocha7.github.io/catalogo-cursos-cted/`.

* **Back-end:** Empacotado via **Docker** e publicado como Web Service gratuito no **Render** acessível pela URL: `https://catalogo-cursos-api.onrender.com/api/cursos`.

## 12. Limitações Conhecidas

* **Hibernação da Hospedagem Gratuita (Render):** No plano gratuito do Render, a instância do servidor entra em estado de repouso após 15 minutos sem requisições. A primeira requisição pode levar cerca de 50 segundos para despertar o serviço.

* **Persistência Temporária no Container:** Por utilizar o plano gratuito do Render sem disco persistente anexo (*Persistent Disk*), alterações no banco de dados SQLite são reiniciadas junto com a instância.

## 13. Relação de Entregáveis e Links Oficiais

1. **Link do Repositório no GitHub:** <https://github.com/brunorocha7/catalogo-cursos-cted>

2. **Link da Aplicação Publicada (Front-end):** <https://brunorocha7.github.io/catalogo-cursos-cted/frontend/>

3. **Link da API Publicada (Render):** <https://catalogo-cursos-api.onrender.com/api/cursos>

4. **Código-fonte do Front-end:** Disponível no repositório na pasta `/frontend`

5. **Código-fonte do Back-end:** Disponível no repositório na pasta `/backend`

6. **Scripts e Banco de Dados:** Banco SQLite (`cursos.db`) gerado via EF Core e inicializado via `AppDbContext.cs` na pasta `/backend`

7. **Arquivo README.md:** Presente na raiz do repositório

8. **Arquivo USO_DE_IA.md:** Presente na raiz do repositório

9. **Pacote Completo em ZIP:** Disponível no arquivo `entregaveis.zip` para submissão