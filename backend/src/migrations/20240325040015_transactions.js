/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
    return knex.schema.createTable('transactions', function(table){
        table.increments('transaction_id').primary();
        table.integer('user_id').unsigned();
        table.integer('product_id').unsigned();
        table.integer('transaction_qty').notNullable();
        table.integer('transaction_price').notNullable();
        table.integer('transaction_total').notNullable();
        table.date('transaction_date').notNullable();
        table.string('transaction_status').notNullable();
        table.foreign('user_id').references('user_id').inTable('users');
        table.foreign('product_id').references('product_id').inTable('products');
    })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
    return knex.schema.dropTable('transactions');
}
