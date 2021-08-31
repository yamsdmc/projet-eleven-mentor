import "reflect-metadata";
import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";
// const userRoutes = require("./src/router/router");
const bodyParser = require("body-parser");

/**
 * Required External Modules
 */
dotenv.config();

/**
 * App Variables
 */
if (!process.env.PORT) {
    process.exit(1);
}
const app = express();

/**
 *  App Configuration
 */
app.use(helmet());
app.use(express.json());
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, PATCH, OPTIONS"
    );
    next();
});
app.use(bodyParser.json());
// app.use("/api", userRoutes);
app.use(cors());

/**
 * Server Activation
 */

app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`);
});