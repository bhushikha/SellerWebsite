const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const fs = require('fs');

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(cookieParser());

app.get('/login', (req, res) => {
  res.send(`
    <html>
      <body>
        <form action="/" method="POST">
          <label for="username">Username:</label>
          <input type="text" name="username" id="username">
          <input type="submit" value="Submit">
        </form>
      </body>
    </html>
  `);
});

app.post('/', (req, res) => {
  const username = req.body.username;
  // Store the username in a cookie
  res.cookie('username', username, { sameSite: 'strict' });
  res.redirect('/');
});

app.post('/messages', (req, res) => {
  const username = req.cookies.username;
  const message = req.body.message;
  // Store the message in a file
  fs.appendFileSync('messages.txt', `${username}: ${message}\n`);
  res.sendStatus(200);
});

app.get('/', (req, res) => {
  const username = req.cookies.username;
  if (!username) {
    res.redirect('/login');
  } else {
    const messages = fs.readFileSync('messages.txt', 'utf8');
    res.send(`
      <html>
        <body>
          <h1>Welcome, ${username}!</h1>
          <form action="/messages" method="POST">
            <label for="message">Message:</label>
            <input type="text" name="message" id="message">
            <input type="submit" value="Send">
          </form>
          <hr>
          <h2>Messages:</h2>
          <pre>${messages}</pre>
        </body>
      </html>
    `);
  }
});

app.listen(8080, () => {
  console.log('Server listening on port 8080');
});
