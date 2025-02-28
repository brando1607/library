import { dbConnection } from "./utils/db.config";
import express from "express";
import cors from "cors";
import { router } from "./routes/index.routes";
const PORT = process.env.PORT;

//app config
const app = express();
app.use(cors());
app.use(express.json());

//router config
app.use(router);

//db and server config
app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`);
});
dbConnection();
