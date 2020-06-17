// Dependencies
import express from 'express';
import * as path from 'path';
import compression from 'compression';
import * as spdy from 'spdy';
import * as fs from 'fs';
import * as http from 'http';

const testRouter = require('./router/testRouter');

const httpPort = 80;
const httpsPort = 443;

const app: express.Application = express();
app.use(express.json());

app.use(compression());
app.use(express.static(`${__dirname}/../dist/`));

http.createServer((req, res) => {
  res.writeHead(301, {'Location': `https://${req.headers['host']}${req.url}`});
  res.end();
}).listen(80, () => {
  console.log(`HTTP/1 Listening on port: ${httpPort}.`);
});

// Certificate
const privateKey = fs.readFileSync(
  `${__dirname}/../certificates/example.key`,
  'utf8');
const certificate = fs.readFileSync(
  `${__dirname}/../certificates/example.crt`,
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

app.use('/testAPI', testRouter);

app.use((req, res) => {
  console.log(__dirname);
  res.sendFile(path.join(`${__dirname}/../dist/index.html`));
});
