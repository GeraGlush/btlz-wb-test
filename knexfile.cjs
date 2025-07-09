require("dotenv").config();

module.exports = {
    client: "pg",
    connection: {
        host: process.env.POSTGRES_HOST ?? "localhost",
        port: parseInt(process.env.POSTGRES_PORT ?? "5000"),
        user: process.env.POSTGRES_USER ?? "postgres",
        password: process.env.POSTGRES_PASSWORD ?? "postgres",
        database: process.env.POSTGRES_DB ?? "postgres",
    },
    migrations: {
        directory: "./src/postgres/migrations",
        extension: "js",
        stub: "./src/config/knex/migration.stub.js",
        tableName: "migrations",
    },
    seeds: {
        directory: "./src/postgres/seeds",
        stub: "./src/config/knex/seed.stub.js",
    },
};
