"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const userRoutes = require("./src/router/router");
var body_parser_1 = __importDefault(require("body-parser"));
var cors_1 = __importDefault(require("cors"));
var dotenv = __importStar(require("dotenv"));
var express_1 = __importDefault(require("express"));
var helmet_1 = __importDefault(require("helmet"));
require("reflect-metadata");
var Database_1 = require("./Database");
Database_1.client.connect().catch(function (e) { return console.log(e); });
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
var app = express_1.default();
/**
 *  App Configuration
 */
app.use(helmet_1.default());
app.use(express_1.default.json());
app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
    next();
});
app.use(body_parser_1.default.json());
// app.use("/api", userRoutes);
app.use(cors_1.default());
/**
 * Server Activation
 */
app.listen(process.env.PORT, function () {
    console.log("Listening on port " + process.env.PORT);
});
