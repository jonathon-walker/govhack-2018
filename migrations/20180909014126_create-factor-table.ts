import * as Knex from "knex";

const TABLE_NAME = "factor";

export async function up(knex: Knex) {
  return knex.schema.createTable(TABLE_NAME, t => {
    t.bigIncrements("id").primary();
    t.specificType("coordinates", "POINT").notNullable();
    t.string("kind", 36).notNullable();
    t.integer("impact").nullable();
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable(TABLE_NAME);
}
