import path from "path";
import { unlink } from "fs";
import express, { NextFunction, Request, Response } from "express";
import { config } from "dotenv";
import { MulterError } from "multer";

import logger from "./utilities/logger";
import { IErrorResponse } from "./utilities";
import HttpError from "./utilities/validation/HttpError.model";
import router from "./routes";

config();
const app = express();

app.use(express.static(path.join(__dirname, "..", "/public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// All Routes
app.use("/api/v1", router);

// No route found
app.use((_: Request, __: Response, next: NextFunction) => {
  const error = new HttpError("Could not found this route", 404);
  next(error);
});

// Error handle middleware
app.use(
  (
    err: HttpError | MulterError,
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    if (req.file) {
      unlink(req.file.path, (_) => {
        logger.error("File Error. Unlink File.");
      });
    }

    if (res.headersSent) {
      logger.warn("Header already sent");
      return next(err);
    }

    logger.error(err.message);
    if (err instanceof MulterError) {
      console.log(err);
      return res.status(400).json({
        timeStamp: new Date().toISOString(),
        code: 400,
        success: false,
        errors: [
          {
            error: "Bad Request",
            message: err.message,
          },
        ],
      } as IErrorResponse);
    }
    res.status(err.code || 500).json({
      timeStamp: new Date().toISOString(),
      code: err.code || 500,
      success: err.success,
      errors: [
        {
          error: err.error,
          message: err.message || "Something went wrong",
          detail: err.detail,
        },
      ],
    });
  }
);

const HOST = process.env.HOST || "localhost";
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  logger.info(`The application running on http://${HOST}:${PORT}`);
});
