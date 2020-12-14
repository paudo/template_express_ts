/**
 * Example .env config file interface for test and production environment. If needed additional parameters can be added.
 */
export interface EnvFile {
  INSECURE_APP_PORT: number;
  SECURE_APP_PORT: number;
  // DB_HOST: string;
  // DB_PORT: number;
  // DB_MAX: number;
  // DB_USER: string;
  // DB_DATABASE: string;
  // DB_PASSWORD: string;
}
