/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('criteria').del()
  await knex('criteria').insert([
    {
      criteria_id: 1, criteria_name: 'Harga Jual',
      sub_start_1: 500, sub_end_1: 49999, sub_weight_1: 5,
      sub_start_2: 50000, sub_end_2: 99999, sub_weight_2: 4,
      sub_start_3: 100000, sub_end_3: 599999, sub_weight_3: 3,
      sub_start_4: 600000, sub_end_4: 4999999, sub_weight_4: 2,
      sub_start_5: 5000000, sub_end_5: 0, sub_weight_5: 1,
    },
    {
      criteria_id: 2, criteria_name: 'Harga Beli',
      sub_start_1: 500, sub_end_1: 49999, sub_weight_1: 5,
      sub_start_2: 50000, sub_end_2: 99999, sub_weight_2: 4,
      sub_start_3: 100000, sub_end_3: 599999, sub_weight_3: 3,
      sub_start_4: 600000, sub_end_4: 4999999, sub_weight_4: 2,
      sub_start_5: 5000000, sub_end_5: 0, sub_weight_5: 1,
    },
    {
      criteria_id: 3, criteria_name: 'Stok Barang',
      sub_start_1: 0, sub_end_1: 5, sub_weight_1: 1,
      sub_start_2: 6, sub_end_2: 10, sub_weight_2: 2,
      sub_start_3: 11, sub_end_3: 15, sub_weight_3: 3,
      sub_start_4: 16, sub_end_4: 20, sub_weight_4: 4,
      sub_start_5: 20, sub_end_5: 0, sub_weight_5: 5,
    },
    {
      criteria_id: 4, criteria_name: 'Jumlah Penjualan',
      sub_start_1: 0, sub_end_1: 5, sub_weight_1: 1,
      sub_start_2: 6, sub_end_2: 10, sub_weight_2: 2,
      sub_start_3: 11, sub_end_3: 15, sub_weight_3: 3,
      sub_start_4: 16, sub_end_4: 20, sub_weight_4: 4,
      sub_start_5: 20, sub_end_5: 0, sub_weight_5: 5,
    },
    {
      criteria_id: 5, criteria_name: 'Jumlah Pembelian',
      sub_start_1: 0, sub_end_1: 5, sub_weight_1: 1,
      sub_start_2: 6, sub_end_2: 10, sub_weight_2: 2,
      sub_start_3: 11, sub_end_3: 15, sub_weight_3: 3,
      sub_start_4: 16, sub_end_4: 20, sub_weight_4: 4,
      sub_start_5: 20, sub_end_5: 0, sub_weight_5: 5,
    }
  ]);
}
