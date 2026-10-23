# Registro do Uso de Inteligência Artificial

## Ferramenta Utilizada
- **Gemini** (Assistente de Inteligência Artificial Generativa)

## Objetivo do Uso
Auxílio no scaffolding e arquitetura inicial da Web API C# (.NET 8.0), estruturação do modelo de dados do Entity Framework Core com SQLite, criação dos scripts responsivos do Front-end (HTML5/CSS3/JS) e apoio na conteinerização com Docker para deploy no Render e GitHub Pages.

## Prompts Relevantes
### O que foi Aproveitado:
- **Estruturação do Back-end:** Prompt solicitando configuração do `AppDbContext` e mapeamento de rotas com suporte a múltiplos filtros de busca (nome, categoria, modalidade, status) no `CursosController.cs`.
- **Dockerização:** Prompt para geração de um `Dockerfile` otimizado em múltiplos estágios para compilar e expor a Web API C#.
- **Interface e Layout:** Prompts para criação do grid responsivo em CSS e lógica de controle do modal de detalhes com tratamento de estados (carregamento, lista vazia, erro e fallback).
- **Atualização da Documentação (`README.md`):** Pedido para reestruturar a árvore de diretórios do projeto documentando a nova pasta de recursos `frontend/fonts/` com as fontes tipográficas locais (*Open Sans*).

### O que foi Descartado:
- **Autenticação Avançada (JWT/OAuth):** Sugestões de implementação de controle de acesso e login foram descartadas por estarem fora do escopo do desafio.
- **Bibliotecas/Frameworks Front-end:** Propostas para uso de React ou Vue.js foram descartadas em favor de JavaScript Vanilla, mantendo a solução simples e leve.

## Como o Conteúdo foi Validado
1. **Compilação e Execução Local:** Todo código C# foi compilado via .NET CLI (`dotnet build` / `dotnet run`) e validado através da interface Swagger (`http://localhost:5092/swagger`).
2. **Testes de Integração:** Requisições via `fetch` no Front-end foram testadas para verificar a correta filtragem e deserialização do JSON retornado pela API.
3. **Inspeção Visual e Responsividade:** Testes em múltiplos tamanhos de tela (desktop e mobile) para validar o CSS Grid, os badges de status e a centralização do modal.

## Exemplo de Erro ou Inadequação Identificado
- **Erro Incompatibilidade de Versões (.NET e EF Core):** Durante o build da imagem Docker no Render, ocorreu o erro `NU1202` (`Microsoft.EntityFrameworkCore.Sqlite 10.0.13 is not compatible with net8.0`). A IA inicialmente sugeriu pacotes do EF Core na versão `10.0.*`, que são incompatíveis com o *target framework* `.NET 8.0`.

## Correção Realizada
Ajuste manual e alinhamento do arquivo `backend/backend.csproj` e do `Dockerfile` para utilizar a versão estável compatível do Entity Framework Core (`8.0.11`) sob o SDK do .NET 8.0, solucionando o problema de compilação na esteira de deploy.