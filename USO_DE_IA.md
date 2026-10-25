# Registro do Uso de Inteligência Artificial

## 1. Ferramenta Utilizada
- **Gemini** (Assistente de Inteligência Artificial Generativa da Google) como copiloto de desenvolvimento para apoio no design, arquitetura, refinamento de código, resolução de conflitos técnicos e estruturação de documentação.

## 2. Objetivo do Uso
Auxílio no *scaffolding* e na arquitetura inicial da Web API em C# (.NET 8.0), estruturação do modelo de dados do Entity Framework Core com SQLite, desenvolvimento dos estilos e layouts responsivos em Front-end (HTML5, CSS3 Grid/Flexbox e JavaScript Vanilla), refinamento da experiência visual e consistência de design (UI) com base em protótipos, otimização de componentes interativos (carrosséis, acordeões e cartões), suporte na configuração de Dockerfiles, resolução de conflitos de versão e de escopo CSS, além da **integração da plataforma LMS MoodleCloud** através de endpoints dedicados em C# (`MoodleController.cs` e `MoodleCursoModel.cs`) e unificação do consumo de múltiplas APIs com detecção inteligente de ambiente entre desenvolvimento local e produção.

## 3. Prompts Relevantes (O que foi aproveitado ou descartado)

### O que foi Aproveitado:
- **Estruturação do Back-end e Filtros Combinados:** Solicitação de configuração do `AppDbContext` e mapeamento de rotas no `CursosController.cs` utilizando consultas LINQ avançadas para suportar pesquisas parciais por nome e filtros cruzados opcionais (categoria, modalidade e status).
- **Integração com MoodleCloud (API do Moodle):** Orientações para estruturar a comunicação REST baseada em tokens com os Web Services do Moodle (`core_course_get_courses`), criação do modelo de dados correspondente (`MoodleCursoModel.cs`) e exposição do endpoint no back-end.
- **Detecção Dinâmica de Ambiente no Front-end:** Implementação de lógica em JavaScript baseada em `window.location.hostname` para alternar automaticamente entre `localhost` e os serviços publicados no Render de forma segura.
- **Implementação de Carrossel Nativo:** Orientações para estruturar carrosséis horizontais fluidos com rolagem suave (`scroll-behavior: smooth`) e ocultação de barras de rolagem nativas (`scrollbar-width: none`), evitando dependências externas pesadas.
- **Ajustes de Espaçamento do Acordeão (`curso.html`):** Pedido para reduzir o *padding* vertical e otimizar as linhas divisórias das seções de módulos na página de detalhes do curso para alinhar perfeitamente com o layout de referência do Figma.
- **Largura e Fundo dos Cartões de Depoimento:** Instruções para estilizar o carrossel de depoimentos, fixando a largura dos cartões em `260px` e aplicando com precisão a cor de fundo bege solicitada, isolando os estilos no arquivo específico da página.
- **Restauração das Setas do Carrossel:** Solicitação para diagnosticar e corrigir o sumiço das setas de navegação do carrossel principal (`index.html`), reajustando os seletores CSS e o posicionamento ao lado do botão de listagem.
- **Criação e Atualização da Documentação (`README.md`):** Pedido de auxílio na reestruturação do arquivo `README.md`, organizando seções técnicas detalhadas e documentando a nova árvore de diretórios do projeto, com destaque para a pasta de recursos `frontend/fonts/` contendo as fontes tipográficas locais (*Open Sans*).
- **Dockerização:** Prompt para geração de um `Dockerfile` otimizado em múltiplos estágios para compilar e expor a Web API C#.

### O que foi Descartado:
- **Autenticação Avançada (JWT/OAuth):** Sugestões iniciais da IA para inclusão de camadas complexas de segurança e login de utilizadores foram descartadas por estarem fora do escopo funcional estipulado para o desafio.
- **Frameworks de Front-end:** Propostas para reestruturar a interface utilizando frameworks como React ou Vue.js foram desconsideradas para manter a stack puramente nativa (HTML, CSS e JavaScript Vanilla).

## 4. Como o Conteúdo foi Validado
1. **Validação de Código e Execução Local:** Os scripts C# gerados foram compilados e testados via .NET CLI (`dotnet run`) e validados por meio da interface interativa do Swagger (`/swagger`), testando inclusive a rota do MoodleCloud.
2. **Testes de Integração Front-end:** Validação em ambiente de navegador com a ferramenta de inspecção (DevTools) para verificar requisições assíncronas em simultâneo (APIs unificadas), consumo correto do payload e funcionamento dos filtros e carrosséis.
3. **Testes Visuais e de Responsividade:** Conferência do comportamento do layout em diferentes resoluções de tela e validação rigorosa da fidelidade visual em relação aos protótipos e imagens de referência enviadas durante o processo.

## 5. Exemplo de Erro ou Inadequação Identificado
- **Erro 1 (Incompatibilidade de Versões - .NET 8 vs EF Core 10):** Durante a criação inicial dos pacotes do projeto e configuração do contêiner Docker, a IA sugeriu pacotes do Entity Framework Core voltados para a versão `10.0.*`, gerando conflito de compatibilidade (`NU1202`) com o SDK alvo do projeto configurado em `.NET 8.0`.
- **Erro 2 (Conflito de Especificidade CSS Global):** Regras genéricas definidas no arquivo `style.css` sobrepunham acidentalmente o espaçamento compacto dos acordeões e alteravam a largura fixa dos cartões de depoimento na página de detalhes (`curso.html`).

## 6. Correção Realizada
- **Correção do Erro 1:** Substituição manual das referências no arquivo `backend.csproj` e no `Dockerfile` para fixar as versões estáveis corretas e totalmente compatíveis com o ecossistema .NET 8 (versão `8.0.11`), restabelecendo com sucesso o build e o deploy automatizado.
- **Correção do Erro 2:** Utilização de seletores compostos e específicos e aplicação cirúrgica de regras no `curso-style.css` para isolar o escopo visual e garantir a fidelidade exata ao design pretendido sem afetar o restante da aplicação.