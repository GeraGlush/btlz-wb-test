/**
 * Create tariffs table for storing warehouse tariffs.
 *
 * @param {import("knex").Knex} knex
 * @returns {Promise<void>}
 */
export async function up(knex) {
    await knex.schema.createTable("tariffs", (table) => {
        table.increments("id").primary();
        table.string("warehouseName").notNullable();
        table.float("boxDeliveryAndStorageExpr");
        table.float("boxDeliveryBase");
        table.float("boxDeliveryLiter");
        table.float("boxStorageBase");
        table.float("boxStorageLiter");
        table.date("collected_at").notNullable();
        table.unique(["warehouseName", "collected_at"]);
    });
}

/**
 * Drop tariffs table.
 *
 * @param {import("knex").Knex} knex
 * @returns {Promise<void>}
 */
export async function down(knex) {
    await knex.schema.dropTable("tariffs");
}
