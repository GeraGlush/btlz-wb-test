import { migrate, seed } from "#postgres/knex.js";
import { initJob as initSyncingTariffsJob } from "#jobs/syncTariffs.js";

await migrate.latest();
await seed.run();
console.log("All migrations and seeds have been run");

initSyncingTariffsJob();
console.log("Job was inited");
