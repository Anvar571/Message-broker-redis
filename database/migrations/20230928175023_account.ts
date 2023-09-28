import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('accounts', function (table) {
    table.increments('id').primary();
    table.string('username').nullable().unique();
    table.string('avatar').nullable();
    table.string('about', 1000).nullable();
    table.string('full_name').notNullable();
    table.string('phone').nullable();
    table.string('email').nullable();
    table.string('password').notNullable();
  })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('accounts');
}

