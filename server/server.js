const http = require('http');
const app = require('./app');

const port = process.env.port | 3000;

const server = http.createServer(app);
server.listen(port);

server.once('listening', () => {
    console.log(`The server is running at http://localhost:${port}`);
});