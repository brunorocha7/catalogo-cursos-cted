# Catálogo de Cursos CTED - Desafio SESI

Aplicação web completa desenvolvida para apresentação, pesquisa e filtragem de um catálogo de cursos educacionais. O projeto conta com back-end em C# (.NET 8.0 Web API) integrado a um banco de dados SQLite e front-end responsivo desenvolvido em HTML, CSS e JavaScript puro, contando com páginas dedicadas de detalhes, barra flutuante de matrícula e simulação de Ambiente Virtual de Aprendizagem (AVA).

## 1. Objetivo da Aplicação

Proporcionar aos usuários uma interface simples, acessível e intuitiva para consultar cursos disponíveis, permitindo pesquisas por nome e filtros combinados por Categoria, Modalidade e Status, além de possibilitar a visualização detalhada de cada curso em uma página própria e a experiência imersiva em um Ambiente Virtual de Aprendizagem (AVA).

## 2. Tecnologias Utilizadas

* **Back-end:** C# / ASP.NET Core Web API (.NET 8.0)
* **Persistência de Dados:** Entity Framework Core com provedor SQLite
* **Documentação de API:** Swashbuckle (Swagger UI)
* **Front-end:** HTML5, CSS3 (Modern Flexbox & Grid), JavaScript Vanilla (ES6+) e tipografia local personalizada (*Open Sans*)
* **Conteinerização e Deploy:** Docker, Render (Back-end Web Service) e GitHub Pages (Front-end)

## 3. Arquitetura da Solução

A solução adota uma arquitetura em camadas desacopladas com separação clara entre Front-end e Back-end:

* **Front-end (Client):** Aplicação estática servida via GitHub Pages composta por múltiplas páginas (`index.html`, `curso.html`, `ava.html`) que consomem endpoints REST via `fetch` assíncrono. Possui camada de *fallback* local para simulação de dados em caso de instabilidade ou suspensão do servidor gratuito.
* **Back-end (Server):** Web API em C# rodando em container Docker no Render, estruturada nos padrões MVC/Controller, gerenciando regras de busca e filtros diretamente no banco de dados.
* **Banco de Dados:** Banco relacional leve SQLite mantido via ORM (Entity Framework Core).

## 4. Estrutura das Pastas

```text
Desafio Sesi/
├── backend/
│   ├── bin/
│   ├── Controllers/
│   │   └── CursosController.cs      # Endpoints da API e regras de filtro
│   ├── Data/
│   │   └── AppDbContext.cs          # Contexto do EF Core e Seed Data
│   ├── Models/
│   │   └── Curso.cs                 # Entidade e modelo de dados
│   ├── obj/
│   ├── Properties/
│   │   └── launchSettings.json      # Configurações de inicialização do perfil de desenvolvimento
│   ├── .gitignore                   # Exclusões específicas do back-end
│   ├── appsettings.Development.json # Configurações de ambiente de desenvolvimento
│   ├── appsettings.json             # Configurações gerais da aplicação e conexão SQLite
│   ├── backend.csproj               # Dependências do projeto C# (.NET 8.0)
│   ├── backend.http                 # Arquivo de testes de requisições HTTP da API
│   ├── cursos.db                    # Arquivo do banco de dados SQLite
│   ├── Dockerfile                   # Script de compilação e execução da imagem Docker
│   └── Program.cs                   # Configuração de serviços, CORS, rotas e middlewares
├── frontend/
│   ├── assets/                      # Imagens, logotipos em SVG e mídias de curso
│   ├── fonts/                       # Tipografia local personalizada (Open Sans)
│   │   ├── static/                  # Versões estáticas (Regular, SemiBold, Bold)
│   │   ├── OFL.txt                  # Licença de fonte aberta (Open Font License)
│   │   ├── OpenSans-Italic-VariableFont_wdth,wght.ttf
│   │   └── OpenSans-VariableFont_wdth,wght.ttf
│   ├── ava-script.js                # Lógica de navegação e módulos do AVA
│   ├── ava-style.css                # Estilização do painel AVA (sidebar e conteúdo)
│   ├── ava.html                     # Simulação do Ambiente Virtual de Aprendizagem (AVA)
│   ├── curso-script.js              # Lógica dinâmica da página de detalhes e balão flutuante
│   ├── curso-style.css              # Estilos específicos da página de detalhes e accordion
│   ├── curso.html                   # Página dedicada de detalhes do curso
│   ├── index.html                   # Página inicial / Catálogo principal com carrossel
│   ├── script.js                    # Lógica da home, filtros e menu hambúrguer mobile
│   └── style.css                    # Estilização global e componentes da home
├── .gitignore                       # Ignora binários, pastas de build e bancos locais
├── README.md                        # Documentação técnica principal
└── USO_DE_IA.md                     # Registro do uso de Inteligência Artificial

```

## 5. Instruções para Execução Local

### Pré-requisitos

* [.NET 8.0 SDK](https://dotnet.microsoft.com/download/dotnet/8.0) instalado.

### Passo a Passo:

1. **Clonar o Repositório:**

```bash
git clone [https://github.com/brunorocha7/catalogo-cursos-cted.git](https://github.com/brunorocha7/catalogo-cursos-cted.git)
cd catalogo-cursos-cted

```

2. **Executar o Back-end (API C#):**

```bash
cd backend
dotnet run

```

A API estará rodando em `http://localhost:5092`. A documentação Swagger pode ser acessada em `http://localhost:5092/swagger`.

3. **Executar o Front-end:**
Abra os arquivos HTML localizados na pasta `frontend/` (`index.html`, `curso.html` ou `ava.html`) em qualquer navegador web (ou utilize a extensão Live Server do VS Code).

## 6. Configuração do Banco de Dados

O banco de dados **SQLite** (`cursos.db`) é configurado e inicializado automaticamente pelo Entity Framework Core na inicialização da aplicação (`AppDbContext.cs`).

Caso o arquivo do banco não exista, o EF Core cria a estrutura de tabelas e popula a base com 6 cursos iniciais de exemplo (*Seed Data*).

## 7. Endpoints da API

| Método | Rota | Descrição | Parâmetros Opcionais (Query) |
| --- | --- | --- | --- |
| `GET` | `/api/cursos` | Lista cursos cadastrados com suporte a filtros combinados. | `nome`, `categoria`, `modalidade`, `status` |
| `GET` | `/api/cursos/{id}` | Retorna os detalhes completos de um curso pelo ID. | `id` (na URL) |

## 8. Modelo de Dados (`Curso`)

| Campo | Tipo C# | Descrição |
| --- | --- | --- |
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

## 9. Estratégia de Responsividade e Mobile

* **CSS Grid e Flexbox:** Utilização de `grid-template-columns: repeat(auto-fill, minmax(280px, 1fr))` no catálogo, permitindo ajuste fluido entre telas de smartphones, tablets e monitores desktop.
* **Menu Hambúrguer Responsivo:** Implementação de navegação lateral deslizante adaptada para dispositivos móveis, garantindo excelente experiência visual sem sobreposição na logo.
* **Página de Detalhes e Balão Flutuante:** Estruturada em grid flexível com barra de ações fixa no rodapé para conversão ágil em mobile.
* **Ambiente Virtual (AVA):** Layout em duas colunas responsivas, adaptando a sidebar de módulos e o conteúdo principal para leitura fluida em celulares e tablets.

## 10. Decisões de Acessibilidade

* **HTML Semântico:** Utilização de tags como `<header>`, `<main>`, `<section>`, `<article>`, `<aside>` e `<nav>`.
* **Atributos ARIA:** Uso de `aria-label` nos campos de entrada/filtros e controles de navegação mobile.
* **Navegação e Contraste:** Relação de contraste adequada para leitura das badges de status, elementos visuais e botões interativos com estados de hover definidos.

## 11. Processo de Publicação

* **Front-end:** Publicado no **GitHub Pages** a partir da ramificação `main` acessível pela URL pública: `https://brunorocha7.github.io/catalogo-cursos-cted/frontend/index.html`.
* **Back-end:** Empacotado via **Docker** e publicado como Web Service gratuito no **Render** acessível pela URL: `https://catalogo-cursos-api.onrender.com/api/cursos`.

## 12. Limitações Conhecidas

* **Hibernação da Hospedagem Gratuita (Render):** No plano gratuito do Render, a instância do servidor entra em estado de repouso após 15 minutos sem requisições. A primeira requisição pode levar cerca de 50 segundos para despertar o serviço.
* **Persistência Temporária no Container:** Por utilizar o plano gratuito do Render sem disco persistente anexo (*Persistent Disk*), alterações no banco de dados SQLite são reiniciadas junto com a instância.

## 13. Relação de Entregáveis e Links Oficiais

1. **Link do Repositório no GitHub:** [https://github.com/brunorocha7/catalogo-cursos-cted](https://github.com/brunorocha7/catalogo-cursos-cted)
2. **Link da Aplicação Publicada (Front-end):** [https://brunorocha7.github.io/catalogo-cursos-cted/frontend/index.html](https://brunorocha7.github.io/catalogo-cursos-cted/frontend/index.html)
3. **Link da API Publicada (Render):** [https://catalogo-cursos-api.onrender.com/api/cursos](https://catalogo-cursos-api.onrender.com/api/cursos)
4. **Código-fonte:** Disponível no repositório com as pastas `/backend` e `/frontend` estruturadas.
5. **Arquivo README.md:** Presente na raiz do repositório.
6. **Arquivo USO_DE_IA.md:** Presente na raiz do repositório.
