import express from 'express';
import compression from 'compression';
import cors from 'cors';
import * as spdy from 'spdy';
import * as fs from 'fs';
import * as path from 'path';
import {Credentials} from './model/interface/credentials.interface';
import {ApiRouter} from './apiRouter';
import * as http from 'http';

/**
 * Creates an ExpressJS server which both hosts the frontend and the backend. In production mode an additional HTTP/2 connection is served
 */
export class Server {
  private _app = express();
  private readonly _router: ApiRouter;

  get router() {
    return this._router;
  }

  /**
   * Creates a HTTP/1 connection
   */
  private createInsecureServer(): void {
    this._app.listen(process.env.INSECURE_APP_PORT, () => {
      console.log(`open http://localhost:${process.env.INSECURE_APP_PORT}`);
      console.log(`HTTP/1 Listening on port: ${process.env.INSECURE_APP_PORT}.`);
    });
  }

  private createPortForward(): void {
    http.createServer((req, res) => {
      // 302 moved temporary, 301 moved permanent
      res.writeHead(302, {'Location': `https://${req.headers['host']}${req.url}`});
      res.end();
    }).listen(process.env.INSECURE_APP_PORT, () => {
      console.log(`HTTP/1 Listening on port: ${process.env.INSECURE_APP_PORT}.`);
    });

  }

  /**
   * Creates a HTTP/2 connection
   * @param credentials
   * @private
   */
  private createSecureServer(credentials: Credentials): void {
    spdy.createServer(credentials, this._app).listen(process.env.SECURE_APP_PORT, () => {
      console.log(`HTTP/2 Listening on port: ${process.env.SECURE_APP_PORT}.`);
    });
  }

  /**
   * Creates a new Server
   * @param prod indicates if production or test server should be hosted
   */
  constructor(prod: boolean) {
    this._app.use(express.json());
    this._app.use(cors());
    this._app.use(compression());
    this._app.use(express.static(__dirname + '/../dist'));

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
      this.createPortForward();
      this.createSecureServer(credentials);
    } else {
      this.createInsecureServer();
    }

    // Creates the API Router with its sub routers
    this._router = new ApiRouter();
    // Sets Route path for API router to /api
    this._app.use('/api', this.router.apiRouter);

    // creates default route to website if route not defined
    this._app.use((req, res) => {
      res.sendFile(path.join(`${__dirname}/../dist/index.html`));
    });

  }
}
