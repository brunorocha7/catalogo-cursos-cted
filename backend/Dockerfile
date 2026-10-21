# Estágio de Build
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copiar o arquivo do projeto e restaurar as dependências
COPY ["backend.csproj", "./"]
RUN dotnet restore "backend.csproj"

# Copiar todo o código-fonte e compilar
COPY . .
RUN dotnet publish "backend.csproj" -c Release -o /app/publish

# Estágio de Execução
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app
COPY --from=build /app/publish .

# Expor a porta que o Render utiliza
ENV ASPNETCORE_URLS=http://+:8080
EXPOSE 8080

ENTRYPOINT ["dotnet", "backend.dll"]