1) npm install
2) dotnet restore
3) webpack --config webpack.config.vendor.js --env.prod
4) webpack --config webpack.config.js --env.prod
5) Add-Migration InitialCreate 
6) Update-Database   