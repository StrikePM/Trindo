/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
    return knex.schema.createTable('npk_wrench', function(table){
        table.increments('alternatif_id').primary();
        table.integer('harga_jual_produk').nullable();
        table.integer('harga_beli_produk').nullable();
        table.integer('stok_produk').nullable();
        table.integer('jumlah_penjualan_produk').nullable();
        table.integer('jumlah_pembelian_produk').nullable();
    })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
    return knex.schema.dropTable('npk_wrench');
}
