import dotenv from "dotenv";
dotenv.config();

export async function requestTariffs(date = new Date()): Promise<WbTariffRawResponse> {
    const rightFormatDate = date.toISOString().slice(0, 10);
    const response = await fetch(`https://common-api.wildberries.ru/api/v1/tariffs/box?date=${rightFormatDate}`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${process.env.WILDBERRIES_API_KEY}`,
        },
    });
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: WbTariffRawResponse = await response.json();
    return data;
}

export function parseTariffs(rawArray: WarehouseTariffRaw[]): WarehouseTariff[] {
    const toFloat = (value: any): number => {
        const num = parseFloat(String(value).replace(",", "."));
        return isNaN(num) ? 0 : num;
    };

    return rawArray.map((raw) => ({
        warehouseName: raw.warehouseName,
        boxDeliveryAndStorageExpr: toFloat(raw.boxDeliveryAndStorageExpr) || 0,
        boxDeliveryBase: toFloat(raw.boxDeliveryBase) || 0,
        boxDeliveryLiter: toFloat(raw.boxDeliveryLiter) || 0,
        boxStorageBase: toFloat(raw.boxStorageBase) || 0,
        boxStorageLiter: toFloat(raw.boxStorageLiter) || 0,
    }));
}
