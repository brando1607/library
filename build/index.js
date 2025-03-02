"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_config_1 = require("./utils/db.config");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const index_routes_1 = require("./routes/index.routes");
const PORT = process.env.PORT;
//app config
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
//router config
app.use("/api", index_routes_1.router);
//db and server config
app.listen(PORT, () => {
    console.log(`Server listening on port http://localhost:${PORT}`);
});
(0, db_config_1.dbConnection)();
