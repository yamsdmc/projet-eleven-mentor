import { join } from "path";
import { ConnectionOptions } from "typeorm";

const config: ConnectionOptions = {
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "postgres",
    database: "dog-db",
    entities: [join(__dirname, "/**/**.entity{.ts,.js}")],
    cli: {
        migrationsDir: "src/migrations",
        entitiesDir: "src/entity",
    },
    synchronize: true,
};

export = config;
