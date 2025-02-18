# مرحله ساخت (Build)
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

# کپی کردن کل پروژه
COPY . .

# بازیابی و ساخت
RUN dotnet restore
RUN dotnet publish FlightReservation.Presentation/FlightReservation.Presentation.csproj -c Release -o out

# مرحله اجرا (Runtime)
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app
COPY --from=build /app/out .

EXPOSE 8080
ENTRYPOINT ["dotnet", "FlightReservation.Presentation.dll"]
