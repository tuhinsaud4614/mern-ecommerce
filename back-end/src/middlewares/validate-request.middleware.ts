import { NextFunction, Request, Response } from "express";
import { AnySchema } from "yup";

import { IErrorResponse } from "../utilities";
import logger from "../utilities/logger";

const validateRequest = (schema: AnySchema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validate({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      return next();
    } catch (er) {
        logger.error(er.errors);
        return res.status(400).json({} as IErrorResponse)
    }
  };
};

export default validateRequest;
