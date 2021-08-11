import path from "path";
import express, { NextFunction, Request, Response } from "express";
import { config } from "dotenv";

import logger from "./utilities/logger";

config();
const app = express();

app.use(express.static(path.join(__dirname, "..", "/public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((_: Request, __: Response, next: NextFunction) => {
    next();
});

const HOST = process.env.HOST || "localhost";
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  logger.info(`The application running on http://${HOST}:${PORT}`);
});
