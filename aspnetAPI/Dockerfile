FROM mcr.microsoft.com/dotnet/aspnet:3.1 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:3.1 AS build
WORKDIR /src
COPY ["aspnetAPI/aspnetAPI.csproj", "aspnetAPI/"]
RUN dotnet restore "aspnetAPI/aspnetAPI.csproj"
COPY . .
WORKDIR "/src/aspnetAPI"
RUN dotnet build "aspnetAPI.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "aspnetAPI.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "aspnetAPI.dll"]
# ENTRYPOINT ["dotnet", "aspnetAPI.dll", "--environment=Development"]