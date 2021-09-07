import { ConnectionOptions } from "typeorm";
import { join } from "path";

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
    },
    synchronize: true,
};

export = config;
