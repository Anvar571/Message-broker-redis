import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('passwords', (table) => {
    table.integer('account_id').notNullable().references('accounts.id');
    table.string('hash').notNullable();
    table.boolean('is_active').nullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
  })
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('passwords');
}

