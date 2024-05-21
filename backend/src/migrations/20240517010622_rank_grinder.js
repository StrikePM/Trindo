/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
    return knex.schema.createTable('rank_grinder', function(table){
        table.increments('alternatif_id').primary();
        table.integer('product_id').notNullable();
        table.integer('category_id').notNullable();
        table.float('net_flow').notNullable();
    })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
    return knex.schema.dropTable('rank_grinder');
}
