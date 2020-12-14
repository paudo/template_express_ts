// import {Pool} from 'pg';

/**
 * Singleton class for connection to DB
 */
export class DbConnection {
  private static _instance: DbConnection = new DbConnection();

  // private _pool: Pool | undefined;

  /**
   * Constructor checks if an instance of this class already exists and returns instance if so
   */
  private constructor() {
    if (DbConnection._instance) {
      return DbConnection._instance;
    }
    DbConnection._instance = this;
  }

  /**
   * Returns instance of DbConnection
   */
  public static getInstance(): DbConnection {
    return DbConnection._instance;
  }

  // /**
  //  * Sets pool for first connection
  //  * @param pool
  //  */
  // set pool(pool: Pool) {
  //   this._pool = pool;
  // }

  // /**
  //  * Gets pool if already set
  //  */
  // get pool(): Pool {
  //   return <Pool>this._pool;
  // }
}
