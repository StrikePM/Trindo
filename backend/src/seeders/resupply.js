/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  // await knex('table_name').del()
  await knex('resupply').insert([
    {
      resupply_id: 1,
      product_id: 29,
      resupply_stock: 5,
      resupply_price: 5750000,
      resupply_total: 28750000,
      resupply_date: '2023-01-18',
      resupply_status: 'selesai'
    },
    {
      resupply_id: 2,
      product_id: 30,
      resupply_stock: 5,
      resupply_price: 6400000,
      resupply_total: 32000000,
      resupply_date: '2023-01-18',
      resupply_status: 'selesai'
    },
    {
      resupply_id: 3,
      product_id: 31,
      resupply_stock: 5,
      resupply_price: 3300000,
      resupply_total: 16500000,
      resupply_date: '2023-01-18',
      resupply_status: 'selesai'
    },
    {
      resupply_id: 4,
      product_id: 32,
      resupply_stock: 5,
      resupply_price: 5645000,
      resupply_total: 28225000,
      resupply_date: '2023-01-18',
      resupply_status: 'selesai'
    },
    {
      resupply_id: 5,
      product_id: 33,
      resupply_stock: 5,
      resupply_price: 1870000,
      resupply_total: 9350000,
      resupply_date: '2023-01-18',
      resupply_status: 'selesai'
    },
    {
      resupply_id: 6,
      product_id: 34,
      resupply_stock: 5,
      resupply_price: 2600000,
      resupply_total: 13000000,
      resupply_date: '2023-01-18',
      resupply_status: 'selesai'
    },
    {
      resupply_id: 7,
      product_id: 22,
      resupply_stock: 10,
      resupply_price: 560000,
      resupply_total: 5600000,
      resupply_date: '2023-02-05',
      resupply_status: 'selesai'
    },
    {
      resupply_id: 8,
      product_id: 23,
      resupply_stock: 10,
      resupply_price: 490000,
      resupply_total: 4900000,
      resupply_date: '2023-02-05',
      resupply_status: 'selesai'
    },
    {
      resupply_id: 9,
      product_id: 24,
      resupply_stock: 10,
      resupply_price: 215000,
      resupply_total: 2150000,
      resupply_date: '2023-02-05',
      resupply_status: 'selesai'
    },
    {
      resupply_id: 10,
      product_id: 25,
      resupply_stock: 10,
      resupply_price: 298000,
      resupply_total: 2980000,
      resupply_date: '2023-02-05',
      resupply_status: 'selesai'
    },
    {
      resupply_id: 11,
      product_id: 26,
      resupply_stock: 10,
      resupply_price: 325500,
      resupply_total: 3255000,
      resupply_date: '2023-02-05',
      resupply_status: 'selesai'
    },
    {
      resupply_id: 12,
      product_id: 27,
      resupply_stock: 10,
      resupply_price: 175000,
      resupply_total: 1750000,
      resupply_date: '2023-02-05',
      resupply_status: 'selesai'
    },
    {
      resupply_id: 13,
      product_id: 28,
      resupply_stock: 10,
      resupply_price: 995000,
      resupply_total: 9950000,
      resupply_date: '2023-02-05',
      resupply_status: 'selesai'
    },
    {
      resupply_id: 14,
      product_id: 49,
      resupply_stock: 5,
      resupply_price: 1050000,
      resupply_total: 5250000,
      resupply_date: '2023-02-05',
      resupply_status: 'selesai'
    },
    {
      resupply_id: 15,
      product_id: 50,
      resupply_stock: 5,
      resupply_price: 895500,
      resupply_total: 4477500,
      resupply_date: '2023-02-05',
      resupply_status: 'selesai'
    },
    {
      resupply_id: 16,
      product_id: 13,
      resupply_stock: 15,
      resupply_price: 1530000,
      resupply_total: 22950000,
      resupply_date: '2023-02-13',
      resupply_status: 'selesai'
    },
    {
      resupply_id: 17,
      product_id: 14,
      resupply_stock: 10,
      resupply_price: 398000,
      resupply_total: 3980000,
      resupply_date: '2023-02-13',
      resupply_status: 'selesai'
    },
    {
      resupply_id: 18,
      product_id: 15,
      resupply_stock: 10,
      resupply_price: 1220000,
      resupply_total: 12200000,
      resupply_date: '2023-02-13',
      resupply_status: 'selesai'
    },
    {
      resupply_id: 19,
      product_id: 16,
      resupply_stock: 10,
      resupply_price: 308500,
      resupply_total: 3085000,
      resupply_date: '2023-02-13',
      resupply_status: 'selesai'
    },
    {
      resupply_id: 20,
      product_id: 18,
      resupply_stock: 10,
      resupply_price: 400800,
      resupply_total: 4008000,
      resupply_date: '2023-02-13',
      resupply_status: 'selesai'
    },
    {
      resupply_id: 21,
      product_id: 19,
      resupply_stock: 10,
      resupply_price: 350500,
      resupply_total: 3505000,
      resupply_date: '2023-02-13',
      resupply_status: 'selesai'
    },
    {
      resupply_id: 22,
      product_id: 20,
      resupply_stock: 10,
      resupply_price: 470800,
      resupply_total: 4708000,
      resupply_date: '2023-02-13',
      resupply_status: 'selesai'
    },
    {
      resupply_id: 23,
      product_id: 21,
      resupply_stock: 10,
      resupply_price: 560000,
      resupply_total: 5600000,
      resupply_date: '2023-02-13',
      resupply_status: 'selesai'
    },
    {
      resupply_id: 24,
      product_id: 42,
      resupply_stock: 5,
      resupply_price: 860000,
      resupply_total: 4300000,
      resupply_date: '2023-03-05',
      resupply_status: 'selesai'
    },
    {
      resupply_id: 25,
      product_id: 43,
      resupply_stock: 5,
      resupply_price: 1250000,
      resupply_total: 6250000,
      resupply_date: '2023-03-05',
      resupply_status: 'selesai'
    },
    {
      resupply_id: 26,
      product_id: 44,
      resupply_stock: 5,
      resupply_price: 5750000,
      resupply_total: 28750000,
      resupply_date: '2023-03-05',
      resupply_status: 'selesai'
    },
    {
      resupply_id: 27,
      product_id: 45,
      resupply_stock: 5,
      resupply_price: 975000,
      resupply_total: 4875000,
      resupply_date: '2023-03-05',
      resupply_status: 'selesai'
    },
    {
      resupply_id: 28,
      product_id: 46,
      resupply_stock: 5,
      resupply_price: 2300000,
      resupply_total: 11500000,
      resupply_date: '2023-03-05',
      resupply_status: 'selesai'
    },
    {
      resupply_id: 29,
      product_id: 47,
      resupply_stock: 5,
      resupply_price: 1980000,
      resupply_total: 9900000,
      resupply_date: '2023-03-05',
      resupply_status: 'selesai'
    },
    {
      resupply_id: 30,
      product_id: 48,
      resupply_stock: 5,
      resupply_price: 6700000,
      resupply_total: 33500000,
      resupply_date: '2023-03-05',
      resupply_status: 'selesai'
    },
    {
      resupply_id: 31,
      product_id: 38,
      resupply_stock: 5,
      resupply_price: 8650000,
      resupply_total: 43250000,
      resupply_date: '2023-03-05',
      resupply_status: 'selesai'
    },
    {
      resupply_id: 32,
      product_id: 39,
      resupply_stock: 5,
      resupply_price: 5350000,
      resupply_total: 26750000,
      resupply_date: '2023-03-05',
      resupply_status: 'selesai'
    },
    {
      resupply_id: 33,
      product_id: 40,
      resupply_stock: 5,
      resupply_price: 6980000,
      resupply_total: 34900000,
      resupply_date: '2023-03-05',
      resupply_status: 'selesai'
    },
    {
      resupply_id: 34,
      product_id: 6,
      resupply_stock: 100,
      resupply_price: 98000,
      resupply_total: 9800000,
      resupply_date: '2023-04-01',
      resupply_status: 'selesai'
    },
    {
      resupply_id: 35,
      product_id: 7,
      resupply_stock: 100,
      resupply_price: 125500,
      resupply_total: 12550000,
      resupply_date: '2023-04-01',
      resupply_status: 'selesai'
    },
    {
      resupply_id: 36,
      product_id: 8,
      resupply_stock: 100,
      resupply_price: 100800,
      resupply_total: 10080000,
      resupply_date: '2023-04-01',
      resupply_status: 'selesai'
    },
    {
      resupply_id: 37,
      product_id: 9,
      resupply_stock: 100,
      resupply_price: 196500,
      resupply_total: 19650000,
      resupply_date: '2023-04-01',
      resupply_status: 'selesai'
    },
    {
      resupply_id: 38,
      product_id: 10,
      resupply_stock: 15,
      resupply_price: 800000,
      resupply_total: 12000000,
      resupply_date: '2023-04-01',
      resupply_status: 'selesai'
    },
    {
      resupply_id: 39,
      product_id: 11,
      resupply_stock: 10,
      resupply_price: 18200000,
      resupply_total: 182000000,
      resupply_date: '2023-04-01',
      resupply_status: 'selesai'
    },
    {
      resupply_id: 40,
      product_id: 12,
      resupply_stock: 15,
      resupply_price: 9200000,
      resupply_total: 138000000,
      resupply_date: '2023-04-01',
      resupply_status: 'selesai'
    },
    {
      resupply_id: 41,
      product_id: 13,
      resupply_stock: 15,
      resupply_price: 1530000,
      resupply_total: 22950000,
      resupply_date: '2023-04-01',
      resupply_status: 'selesai'
    },
    {
      resupply_id: 42,
      product_id: 14,
      resupply_stock: 10,
      resupply_price: 398000,
      resupply_total: 3980000,
      resupply_date: '2023-04-01',
      resupply_status: 'selesai'
    },
    {
      resupply_id: 43,
      product_id: 15,
      resupply_stock: 10,
      resupply_price: 1220000,
      resupply_total: 12200000,
      resupply_date: '2023-04-01',
      resupply_status: 'selesai'
    },
    {
      resupply_id: 44,
      product_id: 16,
      resupply_stock: 10,
      resupply_price: 308500,
      resupply_total: 3085000,
      resupply_date: '2023-04-01',
      resupply_status: 'selesai'
    },
    {
      resupply_id: 45,
      product_id: 18,
      resupply_stock: 10,
      resupply_price: 400800,
      resupply_total: 4008000,
      resupply_date: '2023-04-01',
      resupply_status: 'selesai'
    },
    {
      resupply_id: 46,
      product_id: 19,
      resupply_stock: 10,
      resupply_price: 350500,
      resupply_total: 3505000,
      resupply_date: '2023-04-01',
      resupply_status: 'selesai'
    },
    {
      resupply_id: 47,
      product_id: 20,
      resupply_stock: 10,
      resupply_price: 470800,
      resupply_total: 4708000,
      resupply_date: '2023-04-01',
      resupply_status: 'selesai'
    },
    {
      resupply_id: 48,
      product_id: 21,
      resupply_stock: 10,
      resupply_price: 560000,
      resupply_total: 5600000,
      resupply_date: '2023-04-01',
      resupply_status: 'selesai'
    },
    {
      resupply_id: 49,
      product_id: 35,
      resupply_stock: 5,
      resupply_price: 5600000,
      resupply_total: 28000000,
      resupply_date: '2023-04-01',
      resupply_status: 'selesai'
    },
    {
      resupply_id: 50,
      product_id: 36,
      resupply_stock: 5,
      resupply_price: 5500000,
      resupply_total: 27500000,
      resupply_date: '2023-04-01',
      resupply_status: 'selesai'
    },
    {
      resupply_id: 51,
      product_id: 37,
      resupply_stock: 5,
      resupply_price: 3200000,
      resupply_total: 16000000,
      resupply_date: '2023-04-01',
      resupply_status: 'selesai'
    },
    {
      resupply_id: 52,
      product_id: 41,
      resupply_stock: 5,
      resupply_price: 320000,
      resupply_total: 1600000,
      resupply_date: '2023-04-01',
      resupply_status: 'selesai'
    },
    {
      resupply_id: 53,
      product_id: 1,
      resupply_stock: 15,
      resupply_price: 580000,
      resupply_total: 8700000,
      resupply_date: '2023-04-01',
      resupply_status: 'selesai'
    },
    {
      resupply_id: 54,
      product_id: 2,
      resupply_stock: 15,
      resupply_price: 420000,
      resupply_total: 6300000,
      resupply_date: '2023-04-01',
      resupply_status: 'selesai'
    },
    {
      resupply_id: 55,
      product_id: 3,
      resupply_stock: 15,
      resupply_price: 800000,
      resupply_total: 12000000,
      resupply_date: '2023-04-01',
      resupply_status: 'selesai'
    },
    {
      resupply_id: 56,
      product_id: 4,
      resupply_stock: 100,
      resupply_price: 98000,
      resupply_total: 9800000,
      resupply_date: '2023-04-01',
      resupply_status: 'selesai'
    },
    {
      resupply_id: 57,
      product_id: 5,
      resupply_stock: 100,
      resupply_price: 92000,
      resupply_total: 9200000,
      resupply_date: '2023-04-01',
      resupply_status: 'selesai'
    },
    {
      resupply_id: 58,
      product_id: 42,
      resupply_stock: 5,
      resupply_price: 860000,
      resupply_total: 4300000,
      resupply_date: '2023-05-19',
      resupply_status: 'selesai'
    },
    {
      resupply_id: 59,
      product_id: 43,
      resupply_stock: 5,
      resupply_price: 1250000,
      resupply_total: 6250000,
      resupply_date: '2023-05-19',
      resupply_status: 'selesai'
    },
    {
      resupply_id: 60,
      product_id: 44,
      resupply_stock: 5,
      resupply_price: 5750000,
      resupply_total: 28750000,
      resupply_date: '2023-05-19',
      resupply_status: 'selesai'
    },
    {
      resupply_id: 61,
      product_id: 45,
      resupply_stock: 5,
      resupply_price: 975000,
      resupply_total: 4875000,
      resupply_date: '2023-05-19',
      resupply_status: 'selesai'
    },
    {
      resupply_id: 62,
      product_id: 46,
      resupply_stock: 5,
      resupply_price: 2300000,
      resupply_total: 11500000,
      resupply_date: '2023-05-19',
      resupply_status: 'selesai'
    },
    {
      resupply_id: 63,
      product_id: 47,
      resupply_stock: 5,
      resupply_price: 1980000,
      resupply_total: 9900000,
      resupply_date: '2023-05-19',
      resupply_status: 'selesai'
    },
    {
      resupply_id: 64,
      product_id: 48,
      resupply_stock: 5,
      resupply_price: 6700000,
      resupply_total: 33500000,
      resupply_date: '2023-05-19',
      resupply_status: 'selesai'
    },
    {
      resupply_id: 65,
      product_id: 38,
      resupply_stock: 5,
      resupply_price: 8650000,
      resupply_total: 43250000,
      resupply_date: '2023-05-19',
      resupply_status: 'selesai'
    },
    {
      resupply_id: 66,
      product_id: 39,
      resupply_stock: 5,
      resupply_price: 5350000,
      resupply_total: 26750000,
      resupply_date: '2023-05-19',
      resupply_status: 'selesai'
    },
    {
      resupply_id: 67,
      product_id: 40,
      resupply_stock: 5,
      resupply_price: 6980000,
      resupply_total: 34900000,
      resupply_date: '2023-05-19',
      resupply_status: 'selesai'
    },
    {
      resupply_id: 68,
      product_id: 27,
      resupply_stock: 10,
      resupply_price: 175000,
      resupply_total: 1750000,
      resupply_date: '2023-05-25',
      resupply_status: 'selesai'
    },
    {
      resupply_id: 69,
      product_id: 28,
      resupply_stock: 10,
      resupply_price: 995000,
      resupply_total: 9950000,
      resupply_date: '2023-05-25',
      resupply_status: 'selesai'
    },
    {
      resupply_id: 70,
      product_id: 49,
      resupply_stock: 5,
      resupply_price: 1050000,
      resupply_total: 5250000,
      resupply_date: '2023-05-25',
      resupply_status: 'selesai'
    },
    {
      resupply_id: 71,
      product_id: 50,
      resupply_stock: 5,
      resupply_price: 895500,
      resupply_total: 4477500,
      resupply_date: '2023-05-25',
      resupply_status: 'selesai'
    },
    {
      resupply_id: 72,
      product_id: 45,
      resupply_stock: 5,
      resupply_price: 975000,
      resupply_total: 4875000,
      resupply_date: '2023-07-04',
      resupply_status: 'selesai'
    },
    {
      resupply_id: 73,
      product_id: 46,
      resupply_stock: 5,
      resupply_price: 2300000,
      resupply_total: 11500000,
      resupply_date: '2023-07-04',
      resupply_status: 'selesai'
    },
    {
      resupply_id: 74,
      product_id: 47,
      resupply_stock: 5,
      resupply_price: 1980000,
      resupply_total: 9900000,
      resupply_date: '2023-07-04',
      resupply_status: 'selesai'
    },
    {
      resupply_id: 75,
      product_id: 48,
      resupply_stock: 5,
      resupply_price: 6700000,
      resupply_total: 33500000,
      resupply_date: '2023-07-04',
      resupply_status: 'selesai'
    },
    {
      resupply_id: 76,
      product_id: 38,
      resupply_stock: 5,
      resupply_price: 8650000,
      resupply_total: 43250000,
      resupply_date: '2023-07-04',
      resupply_status: 'selesai'
    },
    {
      resupply_id: 77,
      product_id: 29,
      resupply_stock: 5,
      resupply_price: 5750000,
      resupply_total: 28750000,
      resupply_date: '2023-08-20',
      resupply_status: 'selesai'
    },
    {
      resupply_id: 78,
      product_id: 30,
      resupply_stock: 5,
      resupply_price: 6400000,
      resupply_total: 32000000,
      resupply_date: '2023-08-20',
      resupply_status: 'selesai'
    },
    {
      resupply_id: 79,
      product_id: 11,
      resupply_stock: 10,
      resupply_price: 18200000,
      resupply_total: 182000000,
      resupply_date: '2023-09-17',
      resupply_status: 'selesai'
    },
    {
      resupply_id: 80,
      product_id: 12,
      resupply_stock: 15,
      resupply_price: 9200000,
      resupply_total: 138000000,
      resupply_date: '2023-09-17',
      resupply_status: 'selesai'
    },
    {
      resupply_id: 81,
      product_id: 13,
      resupply_stock: 15,
      resupply_price: 1530000,
      resupply_total: 22950000,
      resupply_date: '2023-09-17',
      resupply_status: 'selesai'
    },
    {
      resupply_id: 82,
      product_id: 14,
      resupply_stock: 10,
      resupply_price: 398000,
      resupply_total: 3980000,
      resupply_date: '2023-09-17',
      resupply_status: 'selesai'
    },
    {
      resupply_id: 83,
      product_id: 15,
      resupply_stock: 10,
      resupply_price: 1220000,
      resupply_total: 12200000,
      resupply_date: '2023-09-17',
      resupply_status: 'selesai'
    },
    {
      resupply_id: 84,
      product_id: 6,
      resupply_stock: 100,
      resupply_price: 98000,
      resupply_total: 9800000,
      resupply_date: '2023-10-14',
      resupply_status: 'selesai'
    },
    {
      resupply_id: 85,
      product_id: 7,
      resupply_stock: 100,
      resupply_price: 125500,
      resupply_total: 12550000,
      resupply_date: '2023-10-14',
      resupply_status: 'selesai'
    },
    {
      resupply_id: 86,
      product_id: 8,
      resupply_stock: 100,
      resupply_price: 100800,
      resupply_total: 10080000,
      resupply_date: '2023-10-14',
      resupply_status: 'selesai'
    },
    {
      resupply_id: 87,
      product_id: 9,
      resupply_stock: 100,
      resupply_price: 196500,
      resupply_total: 19650000,
      resupply_date: '2023-10-14',
      resupply_status: 'selesai'
    },
    {
      resupply_id: 88,
      product_id: 10,
      resupply_stock: 15,
      resupply_price: 800000,
      resupply_total: 12000000,
      resupply_date: '2023-10-14',
      resupply_status: 'selesai'
    },
    {
      resupply_id: 89,
      product_id: 11,
      resupply_stock: 10,
      resupply_price: 18200000,
      resupply_total: 182000000,
      resupply_date: '2023-10-14',
      resupply_status: 'selesai'
    },
    {
      resupply_id: 90,
      product_id: 12,
      resupply_stock: 15,
      resupply_price: 9200000,
      resupply_total: 138000000,
      resupply_date: '2023-10-14',
      resupply_status: 'selesai'
    },
    {
      resupply_id: 91,
      product_id: 13,
      resupply_stock: 15,
      resupply_price: 1530000,
      resupply_total: 22950000,
      resupply_date: '2023-10-14',
      resupply_status: 'selesai'
    },
    {
      resupply_id: 92,
      product_id: 14,
      resupply_stock: 10,
      resupply_price: 398000,
      resupply_total: 3980000,
      resupply_date: '2023-10-14',
      resupply_status: 'selesai'
    },
    {
      resupply_id: 93,
      product_id: 15,
      resupply_stock: 10,
      resupply_price: 1220000,
      resupply_total: 12200000,
      resupply_date: '2023-10-14',
      resupply_status: 'selesai'
    },
    {
      resupply_id: 94,
      product_id: 16,
      resupply_stock: 10,
      resupply_price: 308500,
      resupply_total: 3085000,
      resupply_date: '2023-10-14',
      resupply_status: 'selesai'
    },
    {
      resupply_id: 95,
      product_id: 33,
      resupply_stock: 5,
      resupply_price: 1870000,
      resupply_total: 9350000,
      resupply_date: '2023-10-22',
      resupply_status: 'selesai'
    },
    {
      resupply_id: 96,
      product_id: 34,
      resupply_stock: 5,
      resupply_price: 2600000,
      resupply_total: 13000000,
      resupply_date: '2023-10-22',
      resupply_status: 'selesai'
    },
    {
      resupply_id: 97,
      product_id: 22,
      resupply_stock: 10,
      resupply_price: 560000,
      resupply_total: 5600000,
      resupply_date: '2023-12-02',
      resupply_status: 'selesai'
    },
    {
      resupply_id: 98,
      product_id: 23,
      resupply_stock: 10,
      resupply_price: 490000,
      resupply_total: 4900000,
      resupply_date: '2023-12-02',
      resupply_status: 'selesai'
    },
    {
      resupply_id: 99,
      product_id: 24,
      resupply_stock: 10,
      resupply_price: 215000,
      resupply_total: 2150000,
      resupply_date: '2023-12-02',
      resupply_status: 'selesai'
    },
    {
      resupply_id: 100,
      product_id: 25,
      resupply_stock: 10,
      resupply_price: 298000,
      resupply_total: 2980000,
      resupply_date: '2023-12-02',
      resupply_status: 'selesai'
    }
  ]);
}
