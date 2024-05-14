/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
    return knex.schema.createTable('miatk_wrench', function(table){
        table.increments('alternatif_id').primary();
        table.integer('id_produk').notNullable();
        table.string('nama_produk').notNullable();
        table.integer('id_kategori').notNullable();
        table.integer('harga_jual_produk').notNullable();
        table.integer('harga_beli_produk').notNullable();
        table.integer('stok_produk').notNullable();
        table.integer('jumlah_penjualan_produk').notNullable();
        table.integer('jumlah_pembelian_produk').notNullable();
    })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
    return knex.schema.dropTable('miatk_wrench');
}
