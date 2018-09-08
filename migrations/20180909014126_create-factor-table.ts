import * as Knex from "knex";
import { DbTable } from "../src/infrastructure/db";

export async function up(knex: Knex) {
  return knex.schema.createTable(DbTable.Factor, t => {
    t.bigIncrements("id").primary();
    t.specificType("coordinates", "POINT").notNullable();
    t.string("kind", 36).notNullable();
    t.integer("impact").nullable();
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable(DbTable.Factor);
}
