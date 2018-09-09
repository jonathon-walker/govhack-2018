import * as knex from "knex";
import * as config from "config";

export type Point = string;

export const knexConfig = config.get<knex.Config>("knex");
export const db = knex({ ...knexConfig });

export enum DbTable {
  Factor = "factor"
}
