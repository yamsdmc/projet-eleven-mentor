// const userRoutes = require("./src/router/router");
import bodyParser from "body-parser";
import cors from "cors";
import * as dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import "reflect-metadata";
import { createConnection } from "typeorm";

/**
 * Required External Modules
 */
dotenv.config();

createConnection().then(async (connection) => {
    const app = express();
    await connection.synchronize();
    await connection.runMigrations();
    app.use(helmet());
    app.use(express.json());

    // Ajouter les routes API REST
    // app.use("/api", userRoutes);
    app.use((req, res, next) => {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader(
            "Access-Control-Allow-Headers",
            "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization",
        );
        res.setHeader(
            "Access-Control-Allow-Methods",
            "GET, POST, PUT, DELETE, PATCH, OPTIONS",
        );
        next();
    });
    app.use(bodyParser.json());
    app.use(cors());
    /**
     * Server Activation
     */
    app.listen(process.env.PORT, () => {
        console.log(`Listening on port ${process.env.PORT}`);
    });

    console.log("Express application is up and running on port 3000");

}).catch((error) => console.log("TypeORM connection error: ", error));
