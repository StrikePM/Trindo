/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
    return knex.schema.createTable('users', function(table){
        table.increments('user_id').primary();
        table.string('user_name').notNullable();
        table.string('user_address').notNullable();
        table.string('user_email').notNullable();
        table.string('user_password').notNullable();
        table.string('user_phone').notNullable();
        table.string('user_role').nullable().defaultTo('user');
    })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
    return knex.schema.dropTable('users');
}
