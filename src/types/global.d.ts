export {};

declare global {
  // ответ апи
  interface WarehouseTariffRaw {
    boxDeliveryAndStorageExpr: string;
    boxDeliveryBase: string;
    boxDeliveryLiter: string;
    boxStorageBase: string;
    boxStorageLiter: string;
    warehouseName: string;
  }

  //типизируем так, чтобы нам было удобно
  interface WarehouseTariff {
    boxDeliveryAndStorageExpr: float;
    boxDeliveryBase: float;
    boxDeliveryLiter: float;
    boxStorageBase: float;
    boxStorageLiter: float;
    warehouseName: string;
  }

  interface WbTariffRawResponse {
    response: {
      data: {
        dtNextBox: string;
        dtTillMax: string;
        warehouseList: WarehouseTariffRaw[];
      };
    };
  }
}