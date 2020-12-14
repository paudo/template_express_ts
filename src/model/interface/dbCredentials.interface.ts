/**
 * Example Config for DB Credentials needed by pg node module
 */
export interface DbCredentials {
  user: string,
  host: string,
  database: string,
  password: string,
  port: number,
  max: number,
  idleTimeoutMillis?: number,
  connectionTimeoutMillis?: number,
}
