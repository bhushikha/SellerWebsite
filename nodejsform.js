const http = require('http');

const task9Node=require('./task9Node.js');

const server=http.createServer(task9Node);
 

server.listen(2000, () => {
    console.log('Server running at http://localhost:2000/');
  });