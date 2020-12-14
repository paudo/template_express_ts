import {Router} from 'express';

/**
 * Example for a sub router to have a more structured backend which is divided into multiple router sections
 */
export class SubRouter {
  private _router = Router();

  /**
   * Getter for the sub router
   */
  get subRouter() {
    return this._router;
  }

  constructor() {
    this._configure();
  }

  /**
   * configures all possible API routes
   */
  private _configure() {
    this._router.use('/test', (req, resp) => {
      resp.send(JSON.stringify('This is /api/views/test'));
    });
  }
}
