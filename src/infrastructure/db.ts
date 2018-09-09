import * as knex from "knex";
import * as config from "config";
import * as knexPostgis from "knex-postgis";

export const knexConfig = config.get<knex.Config>("knex");
export const db = knex({ ...knexConfig });
export const st = knexPostgis(db);

export enum DbTable {
  Factor = "factor"
}
