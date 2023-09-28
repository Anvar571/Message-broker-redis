import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('verifications', (table) => {
    table.increments('id').primary();
    table.integer('account_id').notNullable().references('accounts.id');
    table.integer('code').notNullable();
    table.enum('status', ['verified','canceled','pending']);
    table.enum('action', ['registration','login','forgot_password']);
    table.enum('type', ['email','phone']);
    table.timestamp('expired_at').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
  })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('verifications');
}

