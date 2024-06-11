/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  // await knex('table_name').del()
  await knex('transactions').insert([
    {
      transaction_id: 1,
      user_id: 1,
      product_id: 1,
      transaction_qty: 5,
      transaction_price: 665000,
      transaction_total: 3325000,
      transaction_date: '2023-01-03',
      transaction_status: 'po selesai'
    },
    {
      transaction_id: 2,
      user_id: 1,
      product_id: 2,
      transaction_qty: 5,
      transaction_price: 549000,
      transaction_total: 2745000,
      transaction_date: '2023-01-03',
      transaction_status: 'po selesai'
    },
    {
      transaction_id: 3,
      user_id: 1,
      product_id: 3,
      transaction_qty: 5,
      transaction_price: 1020000,
      transaction_total: 5100000,
      transaction_date: '2023-01-03',
      transaction_status: 'po selesai'
    },
    {
      transaction_id: 4,
      user_id: 1,
      product_id: 14,
      transaction_qty: 1,
      transaction_price: 462000,
      transaction_total: 462000,
      transaction_date: '2023-01-03',
      transaction_status: 'po selesai'
    },
    {
      transaction_id: 5,
      user_id: 1,
      product_id: 15,
      transaction_qty: 1,
      transaction_price: 1454000,
      transaction_total: 1454000,
      transaction_date: '2023-01-03',
      transaction_status: 'po selesai'
    },
    {
      transaction_id: 6,
      user_id: 1,
      product_id: 16,
      transaction_qty: 1,
      transaction_price: 428500,
      transaction_total: 428500,
      transaction_date: '2023-01-03',
      transaction_status: 'po selesai'
    },
    {
      transaction_id: 7,
      user_id: 1,
      product_id: 18,
      transaction_qty: 1,
      transaction_price: 490800,
      transaction_total: 490800,
      transaction_date: '2023-01-03',
      transaction_status: 'po selesai'
    },
    {
      transaction_id: 8,
      user_id: 1,
      product_id: 41,
      transaction_qty: 1,
      transaction_price: 550000,
      transaction_total: 550000,
      transaction_date: '2023-01-08',
      transaction_status: 'po selesai'
    },
    {
      transaction_id: 9,
      user_id: 1,
      product_id: 42,
      transaction_qty: 1,
      transaction_price: 942000,
      transaction_total: 942000,
      transaction_date: '2023-01-08',
      transaction_status: 'po selesai'
    },
    {
      transaction_id: 10,
      user_id: 1,
      product_id: 43,
      transaction_qty: 1,
      transaction_price: 1705000,
      transaction_total: 1705000,
      transaction_date: '2023-01-08',
      transaction_status: 'po selesai'
    },
    {
      transaction_id: 11,
      user_id: 1,
      product_id: 44,
      transaction_qty: 1,
      transaction_price: 6125000,
      transaction_total: 6125000,
      transaction_date: '2023-01-08',
      transaction_status: 'po selesai'
    },
    {
      transaction_id: 12,
      user_id: 1,
      product_id: 45,
      transaction_qty: 1,
      transaction_price: 1250000,
      transaction_total: 1250000,
      transaction_date: '2023-01-08',
      transaction_status: 'po selesai'
    },
    {
      transaction_id: 13,
      user_id: 1,
      product_id: 46,
      transaction_qty: 1,
      transaction_price: 2750000,
      transaction_total: 2750000,
      transaction_date: '2023-01-08',
      transaction_status: 'po selesai'
    },
    {
      transaction_id: 14,
      user_id: 1,
      product_id: 1,
      transaction_qty: 1,
      transaction_price: 665000,
      transaction_total: 665000,
      transaction_date: '2023-01-08',
      transaction_status: 'po selesai'
    },
    {
      transaction_id: 15,
      user_id: 1,
      product_id: 2,
      transaction_qty: 1,
      transaction_price: 549000,
      transaction_total: 549000,
      transaction_date: '2023-01-08',
      transaction_status: 'po selesai'
    },
    {
      transaction_id: 16,
      user_id: 1,
      product_id: 3,
      transaction_qty: 1,
      transaction_price: 1020000,
      transaction_total: 1020000,
      transaction_date: '2023-01-08',
      transaction_status: 'po selesai'
    },
    {
      transaction_id: 17,
      user_id: 1,
      product_id: 33,
      transaction_qty: 1,
      transaction_price: 2066000,
      transaction_total: 2066000,
      transaction_date: '2023-01-08',
      transaction_status: 'po selesai'
    },
    {
      transaction_id: 18,
      user_id: 1,
      product_id: 34,
      transaction_qty: 1,
      transaction_price: 3000000,
      transaction_total: 3000000,
      transaction_date: '2023-01-08',
      transaction_status: 'po selesai'
    },
    {
      transaction_id: 19,
      user_id: 1,
      product_id: 4,
      transaction_qty: 1,
      transaction_price: 150000,
      transaction_total: 150000,
      transaction_date: '2023-02-07',
      transaction_status: 'po selesai'
    },
    {
      transaction_id: 20,
      user_id: 1,
      product_id: 5,
      transaction_qty: 1,
      transaction_price: 141000,
      transaction_total: 141000,
      transaction_date: '2023-02-07',
      transaction_status: 'po selesai'
    },
    {
      transaction_id: 21,
      user_id: 1,
      product_id: 34,
      transaction_qty: 2,
      transaction_price: 3000000,
      transaction_total: 6000000,
      transaction_date: '2023-02-07',
      transaction_status: 'po selesai'
    },
    {
      transaction_id: 22,
      user_id: 1,
      product_id: 35,
      transaction_qty: 1,
      transaction_price: 6200000,
      transaction_total: 6200000,
      transaction_date: '2023-02-07',
      transaction_status: 'po selesai'
    },
    {
      transaction_id: 23,
      user_id: 1,
      product_id: 36,
      transaction_qty: 1,
      transaction_price: 6360000,
      transaction_total: 6360000,
      transaction_date: '2023-02-07',
      transaction_status: 'po selesai'
    },
    {
      transaction_id: 24,
      user_id: 1,
      product_id: 37,
      transaction_qty: 1,
      transaction_price: 3850000,
      transaction_total: 3850000,
      transaction_date: '2023-02-07',
      transaction_status: 'po selesai'
    },
    {
      transaction_id: 25,
      user_id: 1,
      product_id: 25,
      transaction_qty: 1,
      transaction_price: 396750,
      transaction_total: 396750,
      transaction_date: '2023-02-11',
      transaction_status: 'po selesai'
    },
    {
      transaction_id: 26,
      user_id: 1,
      product_id: 26,
      transaction_qty: 1,
      transaction_price: 412000,
      transaction_total: 412000,
      transaction_date: '2023-02-11',
      transaction_status: 'po selesai'
    },
    {
      transaction_id: 27,
      user_id: 1,
      product_id: 27,
      transaction_qty: 1,
      transaction_price: 242300,
      transaction_total: 242300,
      transaction_date: '2023-02-11',
      transaction_status: 'po selesai'
    },
    {
      transaction_id: 28,
      user_id: 1,
      product_id: 28,
      transaction_qty: 1,
      transaction_price: 1295000,
      transaction_total: 1295000,
      transaction_date: '2023-02-11',
      transaction_status: 'po selesai'
    },
    {
      transaction_id: 29,
      user_id: 1,
      product_id: 10,
      transaction_qty: 1,
      transaction_price: 900000,
      transaction_total: 900000,
      transaction_date: '2023-02-21',
      transaction_status: 'po selesai'
    },
    {
      transaction_id: 30,
      user_id: 1,
      product_id: 11,
      transaction_qty: 1,
      transaction_price: 19490000,
      transaction_total: 19490000,
      transaction_date: '2023-02-21',
      transaction_status: 'po selesai'
    },
    {
      transaction_id: 31,
      user_id: 1,
      product_id: 12,
      transaction_qty: 1,
      transaction_price: 9200000,
      transaction_total: 9200000,
      transaction_date: '2023-02-21',
      transaction_status: 'po selesai'
    },
    {
      transaction_id: 32,
      user_id: 1,
      product_id: 13,
      transaction_qty: 1,
      transaction_price: 1530000,
      transaction_total: 1530000,
      transaction_date: '2023-02-21',
      transaction_status: 'po selesai'
    },
    {
      transaction_id: 33,
      user_id: 1,
      product_id: 19,
      transaction_qty: 1,
      transaction_price: 421000,
      transaction_total: 421000,
      transaction_date: '2023-02-21',
      transaction_status: 'po selesai'
    },
    {
      transaction_id: 34,
      user_id: 1,
      product_id: 20,
      transaction_qty: 1,
      transaction_price: 546000,
      transaction_total: 546000,
      transaction_date: '2023-02-21',
      transaction_status: 'po selesai'
    },
    {
      transaction_id: 35,
      user_id: 1,
      product_id: 21,
      transaction_qty: 1,
      transaction_price: 632000,
      transaction_total: 632000,
      transaction_date: '2023-02-21',
      transaction_status: 'po selesai'
    },
    {
      transaction_id: 36,
      user_id: 1,
      product_id: 22,
      transaction_qty: 2,
      transaction_price: 630000,
      transaction_total: 1260000,
      transaction_date: '2023-02-21',
      transaction_status: 'po selesai'
    },
    {
      transaction_id: 37,
      user_id: 1,
      product_id: 23,
      transaction_qty: 1,
      transaction_price: 584200,
      transaction_total: 584200,
      transaction_date: '2023-02-21',
      transaction_status: 'po selesai'
    },
    {
      transaction_id: 38,
      user_id: 1,
      product_id: 24,
      transaction_qty: 1,
      transaction_price: 326600,
      transaction_total: 326600,
      transaction_date: '2023-02-21',
      transaction_status: 'po selesai'
    },
    {
      transaction_id: 39,
      user_id: 1,
      product_id: 6,
      transaction_qty: 10,
      transaction_price: 155000,
      transaction_total: 1550000,
      transaction_date: '2023-02-21',
      transaction_status: 'po selesai'
    },
    {
      transaction_id: 40,
      user_id: 1,
      product_id: 7,
      transaction_qty: 10,
      transaction_price: 180000,
      transaction_total: 1800000,
      transaction_date: '2023-02-21',
      transaction_status: 'po selesai'
    },
    {
      transaction_id: 41,
      user_id: 1,
      product_id: 8,
      transaction_qty: 1,
      transaction_price: 188000,
      transaction_total: 188000,
      transaction_date: '2023-04-13',
      transaction_status: 'po selesai'
    },
    {
      transaction_id: 42,
      user_id: 1,
      product_id: 9,
      transaction_qty: 1,
      transaction_price: 280000,
      transaction_total: 280000,
      transaction_date: '2023-04-13',
      transaction_status: 'po selesai'
    },
    {
      transaction_id: 43,
      user_id: 1,
      product_id: 47,
      transaction_qty: 1,
      transaction_price: 2200000,
      transaction_total: 2200000,
      transaction_date: '2023-04-13',
      transaction_status: 'po selesai'
    },
    {
      transaction_id: 44,
      user_id: 1,
      product_id: 18,
      transaction_qty: 2,
      transaction_price: 490800,
      transaction_total: 981600,
      transaction_date: '2023-05-06',
      transaction_status: 'po selesai'
    },
    {
      transaction_id: 45,
      user_id: 1,
      product_id: 19,
      transaction_qty: 2,
      transaction_price: 421000,
      transaction_total: 842000,
      transaction_date: '2023-05-06',
      transaction_status: 'po selesai'
    },
    {
      transaction_id: 46,
      user_id: 1,
      product_id: 20,
      transaction_qty: 1,
      transaction_price: 546000,
      transaction_total: 546000,
      transaction_date: '2023-05-06',
      transaction_status: 'po selesai'
    },
    {
      transaction_id: 47,
      user_id: 1,
      product_id: 21,
      transaction_qty: 1,
      transaction_price: 632000,
      transaction_total: 632000,
      transaction_date: '2023-05-06',
      transaction_status: 'po selesai'
    },
    {
      transaction_id: 48,
      user_id: 1,
      product_id: 22,
      transaction_qty: 1,
      transaction_price: 630000,
      transaction_total: 630000,
      transaction_date: '2023-05-06',
      transaction_status: 'po selesai'
    },
    {
      transaction_id: 49,
      user_id: 1,
      product_id: 23,
      transaction_qty: 1,
      transaction_price: 584200,
      transaction_total: 584200,
      transaction_date: '2023-05-06',
      transaction_status: 'po selesai'
    },
    {
      transaction_id: 50,
      user_id: 1,
      product_id: 44,
      transaction_qty: 1,
      transaction_price: 6125000,
      transaction_total: 6125000,
      transaction_date: '2023-05-26',
      transaction_status: 'po selesai'
    },
    {
      transaction_id: 51,
      user_id: 1,
      product_id: 45,
      transaction_qty: 1,
      transaction_price: 1250000,
      transaction_total: 1250000,
      transaction_date: '2023-05-26',
      transaction_status: 'po selesai'
    },
    {
      transaction_id: 52,
      user_id: 1,
      product_id: 46,
      transaction_qty: 1,
      transaction_price: 2750000,
      transaction_total: 2750000,
      transaction_date: '2023-05-26',
      transaction_status: 'po selesai'
    },
    {
      transaction_id: 53,
      user_id: 1,
      product_id: 1,
      transaction_qty: 1,
      transaction_price: 665000,
      transaction_total: 665000,
      transaction_date: '2023-05-26',
      transaction_status: 'po selesai'
    },
    {
      transaction_id: 54,
      user_id: 1,
      product_id: 2,
      transaction_qty: 1,
      transaction_price: 549000,
      transaction_total: 549000,
      transaction_date: '2023-05-26',
      transaction_status: 'po selesai'
    },
    {
      transaction_id: 55,
      user_id: 1,
      product_id: 19,
      transaction_qty: 2,
      transaction_price: 421000,
      transaction_total: 842000,
      transaction_date: '2023-06-12',
      transaction_status: 'po selesai'
    },
    {
      transaction_id: 56,
      user_id: 1,
      product_id: 20,
      transaction_qty: 1,
      transaction_price: 546000,
      transaction_total: 546000,
      transaction_date: '2023-06-12',
      transaction_status: 'po selesai'
    },
    {
      transaction_id: 57,
      user_id: 1,
      product_id: 21,
      transaction_qty: 1,
      transaction_price: 632000,
      transaction_total: 632000,
      transaction_date: '2023-06-12',
      transaction_status: 'po selesai'
    },
    {
      transaction_id: 58,
      user_id: 1,
      product_id: 22,
      transaction_qty: 1,
      transaction_price: 630000,
      transaction_total: 630000,
      transaction_date: '2023-06-12',
      transaction_status: 'po selesai'
    },
    {
      transaction_id: 59,
      user_id: 1,
      product_id: 23,
      transaction_qty: 1,
      transaction_price: 584200,
      transaction_total: 584200,
      transaction_date: '2023-06-12',
      transaction_status: 'po selesai'
    },
    {
      transaction_id: 60,
      user_id: 1,
      product_id: 4,
      transaction_qty: 1,
      transaction_price: 150000,
      transaction_total: 150000,
      transaction_date: '2023-07-21',
      transaction_status: 'po selesai'
    },
    {
      transaction_id: 61,
      user_id: 1,
      product_id: 5,
      transaction_qty: 1,
      transaction_price: 141000,
      transaction_total: 141000,
      transaction_date: '2023-07-21',
      transaction_status: 'po selesai'
    },
    {
      transaction_id: 62,
      user_id: 1,
      product_id: 10,
      transaction_qty: 1,
      transaction_price: 900000,
      transaction_total: 900000,
      transaction_date: '2023-08-22',
      transaction_status: 'po selesai'
    },
    {
      transaction_id: 63,
      user_id: 1,
      product_id: 11,
      transaction_qty: 1,
      transaction_price: 19490000,
      transaction_total: 19490000,
      transaction_date: '2023-08-22',
      transaction_status: 'po selesai'
    },
    {
      transaction_id: 64,
      user_id: 1,
      product_id: 8,
      transaction_qty: 1,
      transaction_price: 188000,
      transaction_total: 188000,
      transaction_date: '2023-08-28',
      transaction_status: 'po selesai'
    },
    {
      transaction_id: 65,
      user_id: 1,
      product_id: 9,
      transaction_qty: 1,
      transaction_price: 280000,
      transaction_total: 280000,
      transaction_date: '2023-08-28',
      transaction_status: 'po selesai'
    },
    {
      transaction_id: 66,
      user_id: 1,
      product_id: 47,
      transaction_qty: 1,
      transaction_price: 2200000,
      transaction_total: 2200000,
      transaction_date: '2023-08-28',
      transaction_status: 'po selesai'
    },
    {
      transaction_id: 67,
      user_id: 1,
      product_id: 48,
      transaction_qty: 1,
      transaction_price: 7490000,
      transaction_total: 7490000,
      transaction_date: '2023-08-28',
      transaction_status: 'po selesai'
    },
    {
      transaction_id: 68,
      user_id: 1,
      product_id: 49,
      transaction_qty: 1,
      transaction_price: 1271600,
      transaction_total: 1271600,
      transaction_date: '2023-08-28',
      transaction_status: 'po selesai'
    },
    {
      transaction_id: 69,
      user_id: 1,
      product_id: 50,
      transaction_qty: 1,
      transaction_price: 1145760,
      transaction_total: 1145760,
      transaction_date: '2023-08-28',
      transaction_status: 'po selesai'
    },
    {
      transaction_id: 70,
      user_id: 1,
      product_id: 40,
      transaction_qty: 1,
      transaction_price: 8300000,
      transaction_total: 8300000,
      transaction_date: '2023-08-28',
      transaction_status: 'po selesai'
    },
    {
      transaction_id: 71,
      user_id: 1,
      product_id: 29,
      transaction_qty: 1,
      transaction_price: 6200000,
      transaction_total: 6200000,
      transaction_date: '2023-09-13',
      transaction_status: 'po selesai'
    },
    {
      transaction_id: 72,
      user_id: 1,
      product_id: 30,
      transaction_qty: 1,
      transaction_price: 7500000,
      transaction_total: 7500000,
      transaction_date: '2023-09-13',
      transaction_status: 'po selesai'
    },
    {
      transaction_id: 73,
      user_id: 1,
      product_id: 31,
      transaction_qty: 1,
      transaction_price: 4800000,
      transaction_total: 4800000,
      transaction_date: '2023-09-13',
      transaction_status: 'po selesai'
    },
    {
      transaction_id: 74,
      user_id: 1,
      product_id: 32,
      transaction_qty: 1,
      transaction_price: 6250000,
      transaction_total: 6250000,
      transaction_date: '2023-09-13',
      transaction_status: 'po selesai'
    },
    {
      transaction_id: 75,
      user_id: 1,
      product_id: 33,
      transaction_qty: 1,
      transaction_price: 2066000,
      transaction_total: 2066000,
      transaction_date: '2023-09-13',
      transaction_status: 'po selesai'
    },
    {
      transaction_id: 76,
      user_id: 1,
      product_id: 11,
      transaction_qty: 1,
      transaction_price: 19490000,
      transaction_total: 19490000,
      transaction_date: '2023-09-13',
      transaction_status: 'po selesai'
    },
    {
      transaction_id: 77,
      user_id: 1,
      product_id: 13,
      transaction_qty: 1,
      transaction_price: 1530000,
      transaction_total: 1530000,
      transaction_date: '2023-10-01',
      transaction_status: 'po selesai'
    },
    {
      transaction_id: 78,
      user_id: 1,
      product_id: 19,
      transaction_qty: 1,
      transaction_price: 421000,
      transaction_total: 421000,
      transaction_date: '2023-10-01',
      transaction_status: 'po selesai'
    },
    {
      transaction_id: 79,
      user_id: 1,
      product_id: 20,
      transaction_qty: 1,
      transaction_price: 546000,
      transaction_total: 546000,
      transaction_date: '2023-10-01',
      transaction_status: 'po selesai'
    },
    {
      transaction_id: 80,
      user_id: 1,
      product_id: 21,
      transaction_qty: 1,
      transaction_price: 632000,
      transaction_total: 632000,
      transaction_date: '2023-10-01',
      transaction_status: 'po selesai'
    },
    {
      transaction_id: 81,
      user_id: 1,
      product_id: 22,
      transaction_qty: 2,
      transaction_price: 630000,
      transaction_total: 1260000,
      transaction_date: '2023-10-01',
      transaction_status: 'po selesai'
    },
    {
      transaction_id: 82,
      user_id: 1,
      product_id: 23,
      transaction_qty: 1,
      transaction_price: 584200,
      transaction_total: 584200,
      transaction_date: '2023-10-01',
      transaction_status: 'po selesai'
    },
    {
      transaction_id: 83,
      user_id: 1,
      product_id: 24,
      transaction_qty: 1,
      transaction_price: 326600,
      transaction_total: 326600,
      transaction_date: '2023-10-01',
      transaction_status: 'po selesai'
    },
    {
      transaction_id: 84,
      user_id: 1,
      product_id: 29,
      transaction_qty: 1,
      transaction_price: 6200000,
      transaction_total: 6200000,
      transaction_date: '2023-10-06',
      transaction_status: 'po selesai'
    },
    {
      transaction_id: 85,
      user_id: 1,
      product_id: 30,
      transaction_qty: 1,
      transaction_price: 7500000,
      transaction_total: 7500000,
      transaction_date: '2023-10-06',
      transaction_status: 'po selesai'
    },
    {
      transaction_id: 86,
      user_id: 1,
      product_id: 31,
      transaction_qty: 1,
      transaction_price: 4800000,
      transaction_total: 4800000,
      transaction_date: '2023-10-06',
      transaction_status: 'po selesai'
    },
    {
      transaction_id: 87,
      user_id: 1,
      product_id: 32,
      transaction_qty: 1,
      transaction_price: 6250000,
      transaction_total: 6250000,
      transaction_date: '2023-10-06',
      transaction_status: 'po selesai'
    },
    {
      transaction_id: 88,
      user_id: 1,
      product_id: 33,
      transaction_qty: 1,
      transaction_price: 2066000,
      transaction_total: 2066000,
      transaction_date: '2023-10-06',
      transaction_status: 'po selesai'
    },
    {
      transaction_id: 89,
      user_id: 1,
      product_id: 11,
      transaction_qty: 1,
      transaction_price: 19490000,
      transaction_total: 19490000,
      transaction_date: '2023-10-06',
      transaction_status: 'po selesai'
    },
    {
      transaction_id: 90,
      user_id: 1,
      product_id: 1,
      transaction_qty: 5,
      transaction_price: 665000,
      transaction_total: 3325000,
      transaction_date: '2023-10-07',
      transaction_status: 'po selesai'
    },
    {
      transaction_id: 91,
      user_id: 1,
      product_id: 2,
      transaction_qty: 5,
      transaction_price: 549000,
      transaction_total: 2745000,
      transaction_date: '2023-10-07',
      transaction_status: 'po selesai'
    },
    {
      transaction_id: 92,
      user_id: 1,
      product_id: 3,
      transaction_qty: 5,
      transaction_price: 1020000,
      transaction_total: 5100000,
      transaction_date: '2023-10-07',
      transaction_status: 'po selesai'
    },
    {
      transaction_id: 93,
      user_id: 1,
      product_id: 14,
      transaction_qty: 1,
      transaction_price: 462000,
      transaction_total: 462000,
      transaction_date: '2023-10-07',
      transaction_status: 'po selesai'
    },
    {
      transaction_id: 94,
      user_id: 1,
      product_id: 15,
      transaction_qty: 1,
      transaction_price: 1454000,
      transaction_total: 1454000,
      transaction_date: '2023-10-07',
      transaction_status: 'po selesai'
    },
    {
      transaction_id: 95,
      user_id: 1,
      product_id: 16,
      transaction_qty: 1,
      transaction_price: 428500,
      transaction_total: 428500,
      transaction_date: '2023-10-07',
      transaction_status: 'po selesai'
    },
    {
      transaction_id: 96,
      user_id: 1,
      product_id: 18,
      transaction_qty: 1,
      transaction_price: 490800,
      transaction_total: 490800,
      transaction_date: '2023-10-07',
      transaction_status: 'po selesai'
    },
    {
      transaction_id: 97,
      user_id: 1,
      product_id: 36,
      transaction_qty: 1,
      transaction_price: 6360000,
      transaction_total: 6360000,
      transaction_date: '2023-10-16',
      transaction_status: 'po selesai'
    },
    {
      transaction_id: 98,
      user_id: 1,
      product_id: 37,
      transaction_qty: 1,
      transaction_price: 3850000,
      transaction_total: 3850000,
      transaction_date: '2023-10-16',
      transaction_status: 'po selesai'
    },
    {
      transaction_id: 99,
      user_id: 1,
      product_id: 9,
      transaction_qty: 1,
      transaction_price: 280000,
      transaction_total: 280000,
      transaction_date: '2023-11-03',
      transaction_status: 'po selesai'
    },
    {
      transaction_id: 100,
      user_id: 1,
      product_id: 47,
      transaction_qty: 1,
      transaction_price: 2200000,
      transaction_total: 2200000,
      transaction_date: '2023-11-03',
      transaction_status: 'po selesai'
    }
  ]);
}
