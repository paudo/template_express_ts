import dotenv from 'dotenv';
import * as yargs from 'yargs';
import {Server} from './server';
import {EnvFile} from './model/interface/envFile.interface';

// Defines program arguments -p true for production mode
let args = yargs
  .option('prod', {
    alias: 'p',
    default: false,
  }).argv;

// Defines data structure for process.env for auto completion
declare var process: {
  env: EnvFile
};

// sets production mode flag
const prod: boolean = args.prod + '' === 'true';

// selects .env config file based on production mode flag
dotenv.config({
  path: prod ? '.env' : '.env.test',
});

// DB config if needed
// const dbCredentials: DbCredentials = {
//   user: process.env.DB_USER,
//   host: process.env.DB_HOST,
//   database: process.env.DB_DATABASE,
//   password: process.env.DB_PASSWORD,
//   port: process.env.DB_PORT,
//   max: process.env.DB_MAX,
// };

// Creating pool or other connection to DB if needed
// DbConnection.getInstance().pool = new Pool(dbCredentials);
// DbConnection.getInstance().pool.on('error', (err, client) => {
//   console.error('New Error:', err.stack);
//   client.connect();
// });

new Server(prod);
