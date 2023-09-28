import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('todo', (table) => {
    table.increments('id').primary();
    table.string('title').notNullable();
    table.string('description').nullable();
    table.string('category').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
  })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('todo');
}

