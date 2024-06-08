/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
    return knex.schema.createTable('criteria', function(table){
        table.increments('criteria_id').primary();
        table.string('criteria_name').notNullable();
        table.integer('sub_start_1').notNullable();
        table.integer('sub_end_1').notNullable();
        table.integer('sub_weight_1').notNullable();
        table.integer('sub_start_2').notNullable();
        table.integer('sub_end_2').notNullable();
        table.integer('sub_weight_2').notNullable();  
        table.integer('sub_start_3').notNullable();
        table.integer('sub_end_3').notNullable();
        table.integer('sub_weight_3').notNullable();
        table.integer('sub_start_4').notNullable();
        table.integer('sub_end_4').notNullable();
        table.integer('sub_weight_4').notNullable();
        table.integer('sub_start_5').notNullable();
        table.integer('sub_end_5').notNullable();
        table.integer('sub_weight_5').notNullable();
    })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  
}
