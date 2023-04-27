const http = require('http');

http.createServer((req, res) => {
  res.write('My name is Shikha!');
  res.end();
}).listen(4000, () => {
  console.log('Server running at http://localhost:4000/');
});