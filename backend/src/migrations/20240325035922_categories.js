/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
    return knex.schema.createTable('categories', function(table){
        table.increments('category_id').primary();
        table.string('category_name').notNullable();
        table.string('category_desc').notNullable();
    })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
    return knex.schema.dropTable('categories');
}
