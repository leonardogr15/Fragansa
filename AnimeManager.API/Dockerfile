# etapa de build
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src

# Copiamos sólo los csproj primero (cache layer)
COPY ["AnimeManager.API/AnimeManager.API.csproj", "AnimeManager.API/"]
COPY ["AnimeManager.Infrastructure/AnimeManager.Infrastructure.csproj", "AnimeManager.Infrastructure/"]
COPY ["AnimeManager.Domain/AnimeManager.Domain.csproj", "AnimeManager.Domain/"]
COPY ["AnimeManager.sln", "."]

# Restauramos
RUN dotnet restore "AnimeManager.API/AnimeManager.API.csproj"

# Copiamos todo y publicamos
COPY . .
WORKDIR "/src/AnimeManager.API"
RUN dotnet publish "AnimeManager.API.csproj" -c Release -o /app/publish

# etapa runtime
FROM mcr.microsoft.com/dotnet/aspnet:9.0
WORKDIR /app
COPY --from=build /app/publish .
ENTRYPOINT ["dotnet", "AnimeManager.API.dll"]
