import { requestTariffs, parseTariffs } from "../modules/tariffs/wbTariffService.js";
import { saveTariffs } from "../postgres/repositories/wbTariffsRepository.js";
import { updateAllSheets } from "#modules/sheets/sheetsService.js";
import cron from "node-cron";
import dotenv from "dotenv";
dotenv.config();

async function updateTariffs() {
    const now = new Date();
    const tariffResponse: WbTariffRawResponse = await requestTariffs(now);
    const warehouseList: WarehouseTariff[] = parseTariffs(tariffResponse.response.data.warehouseList);

    await Promise.all([saveTariffs(warehouseList), updateAllSheets(warehouseList)]);
    console.log("New tariffs was saved and written to all sheets");
}

export function initJob() {
    cron.schedule("0 * * * *", async () => {
        try {
            await updateTariffs();
        } catch (err) {
            console.error("❌ Cron job error:", err);
        }
    });

    if (process.env.APP_MODE === 'dev') updateTariffs();
}
