const http = require('http');
const fs = require('fs');
const querystring = require('querystring');

const server = http.createServer((req, res) => {
    const url = req.url;
    const method = req.method;

    if (url === '/') {
        res.write('<html>');
        res.write('<head><title>Enter Message</title></head>');
        res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>');
        res.write('</html>');

        fs.readFile('message.txt', 'utf-8', (err, data) => {
            if (err) {
                console.error(err);
                return res.end();
            }
           let messages = [];
            try {
            messages = JSON.parse(data);
         }  catch (e) {
            console.error(e);
       }
            res.write('<ul>');
            for (const message of messages) {
                res.write(`<li>${message}</li>`);
      }
            res.write('</ul>');
            res.end();
    });

  } else if (url === '/message' && method === 'POST') {
    const body = [];
    req.on('data', (chunk) => {
      body.push(chunk);
    });
    req.on('end', () => {
      const parsedBody = Buffer.concat(body).toString();
      const message = querystring.parse(parsedBody).message;
      if (!message) {
        res.statusCode = 400;
        res.write('<html><body><h1>Bad Request</h1></body></html>');
        return res.end();
      }
      fs.readFile('message.txt', 'utf-8', (err, data) => {
        let messages = [];
        if (!err) {
          try {
            messages = JSON.parse(data);
          } catch (e) {
            console.error(e);
          }
        }
        messages.unshift(message);
        fs.writeFile('message.txt', JSON.stringify(messages), (err) => {
          if (err) {
            console.error(err);
          }
          res.statusCode = 302;
          res.setHeader('Location', '/');
          return res.end();
        });
      });
    });

  } else {
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>My first page!</title></head>');
    res.write('<body><h1>Hello from my node.js server!</h1></body>');
    res.write('</html>');
    res.end();
  }
});

server.listen(3000, () => {
  console.log('Server running at http://localhost:3000/');
});
