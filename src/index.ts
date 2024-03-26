import "dotenv/config";
import "reflect-metadata";
import fs from "fs";
import path from "path";

import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import { rateLimit } from 'express-rate-limit'

import "./utils/response/customSuccess";
import { databaseConnection } from "./utils/database";
import { errorHandler } from "./middleware/errorHandler";
import routes from "./routes";


export const app = express();
app.use(cors());
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(rateLimit({
  legacyHeaders: false,
	windowMs: 60 * 1000,
	max: 10,
  standardHeaders: 'draft-7'
}))

try {
  const accessLogStream = fs.createWriteStream(path.join(__dirname, "../log/access.log"), {
    flags: "a",
  });
  app.use(morgan("combined", { stream: accessLogStream }));
} catch (err) {
  console.log(err);
}

databaseConnection();
app.use(morgan("combined"));

app.get("/ping", (req, res) => {
  res.send({
    code: 200,
    message: "Server running....",
  });
});

app.use("/", routes);

app.use(errorHandler);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
