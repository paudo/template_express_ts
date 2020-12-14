import {Router} from 'express';
import {SubRouter} from './subRouter/subRouter';

/**
 * Entry point for all url paths which are not directly associated to the hosted website
 */
export class ApiRouter {
  private _router = Router();
  private _subRouter: SubRouter;

  /**
   * Getter for API Router
   */
  get apiRouter() {
    return this._router;
  }

  constructor() {
    this._subRouter = new SubRouter();
    this._configure();
  }

  /**
   * Configures all possible routes including all sub routers
   */
  private _configure(): void {
    this._router.use('/subRouter', this._subRouter.subRouter);

    this._router.use('/test', (req, resp) => {
      resp.send(JSON.stringify('This is /api/test'));
    });
  }
}
