import { knexConfig } from "../src/infrastructure/db";
import { isString, pick } from "lodash";
import { Pool, PoolConfig } from "pg";
import { ConnectionConfig } from "knex";
import { log } from "../src/infrastructure/logger";

async function create() {
  if (isString(knexConfig.connection)) {
    throw new Error();
  }

  const connection = knexConfig.connection as PoolConfig;

  const db = new Pool({
    ...connection,
    database: "postgres"
  });

  await db.query(`CREATE DATABASE ${connection.database}`);
  log.info("db created");

  await db.query(`ALTER DATABASE ${connection.database} SET timezone TO 'UTC'`);
  await db.query("SELECT pg_reload_conf()");
  log.info("db timezone set to UTC");

  await db.end();
}

create();
