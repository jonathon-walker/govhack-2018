import * as knex from "knex";
import * as config from "config";

export const knexConfig = config.get<knex.Config>("knex");
export const db = knex({ ...knexConfig });
