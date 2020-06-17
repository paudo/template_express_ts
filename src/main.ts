import express from 'express';
import path from 'path';
import * as fs from 'fs';
import * as spdy from 'spdy';
import * as http from 'http';

const app = express();

const httpPort = 80;
const httpsPort = 443

app.use(express.static(__dirname + '/../dist'))

app.get('/hello', (req, res) => {
  res.send('Hello World!');
})

http.createServer((req, res) => {
  res.writeHead(301, {'Location': `https://${req.headers['host']}${req.url}`});
  res.end();
}).listen(80, () => {
  console.log(`HTTP/1 Listening on port: ${httpPort}.`);
});

// Certificate
const privateKey = fs.readFileSync(
  `${__dirname}/../certificates/localhost.key`,
  'utf8');
const certificate = fs.readFileSync(
  `${__dirname}/../certificates/localhost.crt`,
  'utf8');

const credentials = {
  key: privateKey,
  cert: certificate,
};

// @ts-ignore
spdy.createServer(credentials, app).listen(httpsPort, (error) => {
  if (error) {
    console.error(error);
    return process.exit(1);
  } else {
    console.log(`HTTP/2 Listening on port: ${httpsPort}.`);
  }
});

app.use((req, res) => {
  console.log(__dirname);
  res.sendFile(path.join(`${__dirname}/../dist/index.html`));
});
