import 'server only';
import postgres, { type Sql } from 'postgres';
import postgresJsConfig from '../ley.config.js';
import { setEnvironmentalVariables } from '../util/config';

setEnvironmentalVariables();

declare namespace globalThis {
  let postgresSqlClient: Sql;
}

function connectOneTimeToDatabase() {
  if (!('postgresSqlClient' in globalThis)) {
    globalThis.postgresSqlClient = postgres(postgresJsConfig);
  }
  return globalThis.postgresSqlClient;
}

export const sql = connectOneTimeToDatabase();
