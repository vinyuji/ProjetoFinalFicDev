require('./database'); //iniciando o banco de dados antes do servidor

const express = require( 'express' );
const { routes } = require('./routes');
const server = express();

server.use(express.json());
server.use(routes);


server.listen(8080, () => {
    console.log(' Server started in http://localhost:8080');
});