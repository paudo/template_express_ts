import {Router} from 'express';

export class SubRouter {
  private _router = Router();

  get subRouter() {
    return this._router;
  }

  constructor() {
    this._configure();
  }

  private _configure() {
    this._router.use('/test', (req, resp) => {
      resp.send(JSON.stringify('This is /views/test'));
    });
  }
}
