require('./database'); // Iniciando o banco de dados antes do servidor

const express = require('express');
const { routes } = require('./Router');
const server = express();

server.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

server.use(express.json());
server.use(routes);

server.listen(8080, () => {
  console.log('Server started in http://localhost:8080');
});
