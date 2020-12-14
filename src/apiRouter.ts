import {Router} from 'express';
import {SubRouter} from './subRouter/subRouter';

export class ApiRouter {
  private _router = Router();
  private _subRouter: SubRouter;

  get apiRouter() {
    return this._router;
  }

  constructor() {
    this._subRouter = new SubRouter();
    this._configure();
  }

  private _configure(): void {
    this._router.use('/subRouter', this._subRouter.subRouter);

    this._router.use('/test', (req,resp) => {
      resp.send(JSON.stringify('This is /test'));
    })
  }
}
