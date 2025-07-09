import { google } from "googleapis";
import knex from "../../postgres/knex.js";
import dotenv from "dotenv";
dotenv.config();

const auth = new google.auth.GoogleAuth({
    keyFile: "./src/config/google/credentials.json",
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});
const sheets = google.sheets({ version: "v4", auth });

async function updateSheet(spreadsheetId: string, rows: WarehouseTariff[]) {
    const headers = ["Имя склада", "Доставка экспресс", "Базовая доставка", "Доставка за литр", "Базовое хранение", "Хранение за литр"];
    const values = rows.map((row: WarehouseTariff) => [
        row.warehouseName,
        row.boxDeliveryAndStorageExpr,
        row.boxDeliveryBase,
        row.boxDeliveryLiter,
        row.boxStorageBase,
        row.boxStorageLiter,
    ]);

    await sheets.spreadsheets.values.update({
        spreadsheetId,
        range: "stocks_coefs",
        valueInputOption: "RAW",
        requestBody: { values: [headers, ...values] },
    });

    console.log(`Table ${spreadsheetId} was updated`);
}

export async function updateAllSheets(tariffsRows: WarehouseTariff[] | null = null) {
    if (!process.env.GOOGLE_SHEETS_IDS) throw new Error("GOOGLE_SHEETS_IDS is missing in env!");

    const sheetIds: string[] = process.env.GOOGLE_SHEETS_IDS.split(",").map((id) => id.trim());
    const updatingPromises: Promise<void>[] = [];

    const calculateCoefficient = (tariff: WarehouseTariff): number => {
        return tariff.boxDeliveryAndStorageExpr + tariff.boxDeliveryBase + tariff.boxDeliveryLiter + tariff.boxStorageBase + tariff.boxStorageLiter;
    };
    
    const rows: WarehouseTariff[] = tariffsRows ?? (await knex("tariffs").where("collected_at", new Date().toISOString().slice(0, 10)));    
    rows.sort((a, b) => calculateCoefficient(a) - calculateCoefficient(b)); // сортируем по коофиценту


    if (rows.length === 0) {
        console.warn("No data for today! Sheets not gonna be updated!");
        return;
    }

    for (let i = 0; i < sheetIds.length; i++) {
        const sheetId = sheetIds[i];
        updatingPromises.push(
            updateSheet(sheetId, rows).catch((err) => {
                console.error(`❌ Ошибка при обновлении таблицы ${sheetId}:`, err.message || err);
            }),
        );
    }

    await Promise.all(updatingPromises);
}
