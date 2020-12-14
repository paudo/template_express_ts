import express from 'express';
import compression from 'compression';
import cors from 'cors';
import * as spdy from 'spdy';
import * as fs from 'fs';
import * as path from 'path';
import {Credentials} from './model/interface/credentials.interface';
import {ApiRouter} from './apiRouter';

export class Server {
  private _app = express();
  private readonly _router: ApiRouter;

  get router() {
    return this._router;
  }

  private createInsecureServer(): void {
    this._app.listen(process.env.INSECURE_APP_PORT, () => {
      console.log(`open http://localhost:${process.env.INSECURE_APP_PORT}`);
      console.log(`HTTP/1 Listening on port: ${process.env.INSECURE_APP_PORT}.`);
    });
  }

  private createSecureServer(credentials: Credentials): void {
    spdy.createServer(credentials, this._app).listen(process.env.SECURE_APP_PORT, () => {
      console.log(`HTTP/2 Listening on port: ${process.env.SECURE_APP_PORT}.`);
    });
  }

  constructor(prod: boolean) {
    this._app.use(express.json());
    this._app.use(cors());
    this._app.use(compression());
    this._app.use(express.static(__dirname + '/../dist'));

    this.createInsecureServer();

    if (prod) {
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

      this.createSecureServer(credentials);
    }

    this._router = new ApiRouter();
    this._app.use('/api', this.router.apiRouter);

    this._app.use((req, res) => {
      res.sendFile(path.join(`${__dirname}/../dist/index.html`));
    });

  }
}
