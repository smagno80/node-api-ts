import express from "express";
import { NODE_ENV, PORT } from "./config/config";

const app = express();

console.log(NODE_ENV, process.env.PORT);

app.listen(PORT, () => {
  console.log(`api running in Mode: ${NODE_ENV} port: ${PORT}`);
});
