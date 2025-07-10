import { migrate } from "#postgres/knex.js";
import { initJob as initSyncingTariffsJob } from "#jobs/syncTariffs.js";

await migrate.latest();
console.log("All migrations have been run");

initSyncingTariffsJob();
console.log("Job was inited");
