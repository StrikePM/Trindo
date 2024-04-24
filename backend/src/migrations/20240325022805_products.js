/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
    return knex.schema.createTable('products', function(table){
        table.increments('product_id').primary();
        table.string('product_name').notNullable();
        table.integer('category_id').unsigned();
        table.string('product_brand').notNullable();
        table.string('product_desc').notNullable();
        table.integer('product_price').notNullable();
        table.string('product_image').notNullable();
        table.foreign('category_id').references('category_id').inTable('categories');
        table.integer('product_stock').nullable().defaultTo(0);
    })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
    return knex.schema.dropTable('products');
}
