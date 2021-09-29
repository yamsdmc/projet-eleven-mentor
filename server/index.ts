import bodyParser from "body-parser";
import cors from "cors";
import * as dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import "reflect-metadata";
import swaggerJsDocs from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import {createConnection} from "typeorm";
import {routerTest} from "./routerTest";
import {router} from "./src/router/router";

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
    app.use("/api", router);

    app.use("/test", routerTest);
    const swaggerOptions = {
        swaggerDefinition: {
            info: {
                title: "Library API",
                version: "1.0.0",
            },
        },
        apis: ["index.ts"],
    };

    const swaggerDocs = swaggerJsDocs(swaggerOptions);
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
    /**
     * @swagger
     * /tete:
     *  get:
     *    description: Get all books
     *    responses:
     *      200:
     *       description: Success
     */
    routerTest.get("/tete", (req, res) => {
        res.send([
            {
                id: 1,
                title: "title test 1",
            },
            {
                id: 2,
                title: "title test 2",
            },
        ]);
    });


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
