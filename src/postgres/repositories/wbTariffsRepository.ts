import knex from "../knex.js";

export async function saveTariffs(tariffs: WarehouseTariff[]) {
    const collectedAt = new Date().toISOString().slice(0, 10);

    const records = tariffs.map((t) => ({
        warehouseName: t.warehouseName,
        boxDeliveryAndStorageExpr: t.boxDeliveryAndStorageExpr,
        boxDeliveryBase: t.boxDeliveryBase,
        boxDeliveryLiter: t.boxDeliveryLiter,
        boxStorageBase: t.boxStorageBase,
        boxStorageLiter: t.boxStorageLiter,
        collected_at: collectedAt,
    }));

    await knex("tariffs").del();
    await knex("tariffs").insert(records);

    console.log(`Saved ${records.length} tariffs records.`);
}
