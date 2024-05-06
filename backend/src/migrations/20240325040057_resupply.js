/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
    return knex.schema.createTable('resupply', function(table){
        table.increments('resupply_id').primary();
        table.integer('product_id').unsigned();
        table.integer('resupply_stock').notNullable();
        table.integer('resupply_price').notNullable();
        table.integer('resupply_total').notNullable();
        table.date('resupply_date').notNullable();
        table.string('resupply_status').notNullable();
        table.foreign('product_id').references('product_id').inTable('products');
    })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
    return knex.schema.dropTable('resupply');
}
