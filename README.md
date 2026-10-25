
# Catálogo de Cursos CTED - Desafio SESI

Aplicação web completa desenvolvida para apresentação, pesquisa e filtragem de um catálogo de cursos educacionais. O projeto conta com back-end em C# (.NET 8.0 Web API) integrado a um banco de dados SQLite e a uma plataforma LMS **MoodleCloud**, além de um front-end responsivo desenvolvido em HTML, CSS e JavaScript puro, contando com páginas dedicadas de detalhes, barra flutuante de matrícula e simulação de Ambiente Virtual de Aprendizagem (AVA).

## 1. Objetivo da Aplicação

Proporcionar aos usuários uma interface simples, acessível e intuitiva para consultar cursos disponíveis (tanto do catálogo geral quanto os oficiais integrados do MoodleCloud), permitindo pesquisas por nome e filtros combinados por Categoria, Modalidade e Status, além de possibilitar a visualização detalhada de cada curso em uma página própria e a experiência imersiva em um Ambiente Virtual de Aprendizagem (AVA).

## 2. Tecnologias Utilizadas

- **Back-end:** C# / ASP.NET Core Web API (.NET 8.0)
- **Integração Externa:** MoodleCloud Web Services (REST)
- **Persistência de Dados:** Entity Framework Core com provedor SQLite
- **Documentação de API:** Swashbuckle (Swagger UI)
- **Front-end:** HTML5, CSS3 (Modern Flexbox & Grid), JavaScript Vanilla (ES6+) e tipografia local personalizada (*Open Sans*)
- **Conteinerização e Deploy:** Docker, Render (Back-end Web Services) e GitHub Pages (Front-end)

## 3. Arquitetura da Solução

A solução adota uma arquitetura em camadas desacopladas com separação clara entre Front-end e Back-end:

- **Front-end (Client):** Aplicação estática servida via GitHub Pages composta por múltiplas páginas (`index.html`, `curso.html`, `ava.html`) que consomem em simultâneo múltiplos endpoints REST via `fetch` assíncrono (API de Cursos + API do Moodle com detecção inteligente de ambiente entre `localhost` e produção).
- **Back-end (Server):** Web API em C# rodando em container Docker no Render, estruturada nos padrões MVC/Controller, gerindo tanto as regras de negócio locais quanto a comunicação segura via token REST com o MoodleCloud.
- **Banco de Dados:** Banco relacional leve SQLite mantido via ORM (Entity Framework Core).

## 4. Estrutura das Pastas

```text
Desafio Sesi/
├── backend/
│   ├── bin/
│   ├── Controllers/
│   │   ├── CursosController.cs      # Endpoints da API local e regras de filtro
│   │   └── MoodleController.cs      # Endpoints de integração com o MoodleCloud
│   ├── Data/
│   │   └── AppDbContext.cs          # Contexto do EF Core e Seed Data
│   ├── Models/
│   │   ├── Curso.cs                 # Entidade e modelo de dados local
│   │   └── MoodleCursoModel.cs      # Modelo de dados correspondente aos cursos do Moodle
│   ├── obj/
│   ├── Properties/
│   │   └── launchSettings.json      # Configurações de inicialização do perfil de desenvolvimento
│   ├── .gitignore                   # Exclusões específicas do back-end
│   ├── appsettings.Development.json # Configurações de ambiente de desenvolvimento
│   ├── appsettings.json             # Configurações gerais, SQLite e MoodleSettings
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
│   ├── script.js                    # Lógica da home, filtros, consumo unificado de APIs e carrosséis
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

A API estará rodando em [localhost:5092](http://localhost:5092). A documentação Swagger pode ser acessada no [Swagger UI (localhost:5092/swagger)](http://localhost:5092/swagger).

3. **Executando o Front-end sem extensões (Modo Direto):**

Caso não esteja utilizando a extensão *Live Server* ou outro servidor local, você pode abrir as telas do projeto diretamente no seu navegador:

1. Navegue até a pasta `frontend` pelo seu **Explorador de Arquivos** (Windows) ou **Finder** (Mac).
2. Dê um duplo clique no arquivo **`index.html`** (ou clique com o botão direito e selecione **Abrir com > Google Chrome / Microsoft Edge / Firefox**).

> **Nota:** O script front-end possui detecção automática de ambiente: se estiver rodando localmente, consome tanto a API de cursos quanto a API do Moodle em `localhost`, e em produção direciona para os serviços hospedados na nuvem.

O banco de dados **SQLite** (`cursos.db`) é configurado e inicializado automaticamente pelo Entity Framework Core na inicialização da aplicação (`AppDbContext.cs`).

Caso o arquivo do banco não exista, o EF Core cria a estrutura de tabelas e popula a base com 6 cursos iniciais de exemplo (*Seed Data*).

## 6. Integração com MoodleCloud (API do Moodle)

O back-end do projeto conta com um módulo de integração dedicado via Web Services REST com a plataforma **MoodleCloud**, permitindo que os cursos cadastrados no ambiente virtual de aprendizagem sejam recuperados e exibidos dinamicamente no front-end em conjunto com o catálogo local.

### Configuração e Autenticação

A comunicação com o Moodle é autenticada através de um **Token de Acesso** gerado no painel do MoodleCloud e mapeada nas configurações da aplicação (`appsettings.json`):

```json
"MoodleSettings": {
  "BaseUrl": "[https://sua-instancia.moodlecloud.com/webservice/rest/server.php](https://sua-instancia.moodlecloud.com/webservice/rest/server.php)",
  "Token": "SEU_TOKEN_SECRETO_AQUI"
}



```

## 7. Endpoints da API

| Método | Rota | Descrição | Parâmetros Opcionais / Notas |
| --- | --- | --- | --- |
| `GET` | `/api/cursos` | Lista cursos cadastrados localmente com suporte a filtros combinados. | `nome`, `categoria`, `modalidade`, `status` |
| `GET` | `/api/cursos/{id}` | Retorna os detalhes completos de um curso local pelo ID. | `id` (na URL) |
| `GET` | `/api/Moodle/cursos` | Comunica com o MoodleCloud via Web Services REST (`core_course_get_courses`), processa o payload e retorna os cursos ativos da plataforma LMS. | Consome as credenciais e token configurados no back-end |

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

* **Front-end:** Publicado no **GitHub Pages** a partir da ramificação `main` acessível pela URL pública.
* **Back-end:** Empacotado via **Docker** e publicado como Web Service gratuito no **Render**, unificando as rotas da API local e os cursos integrados do MoodleCloud.

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

```

```