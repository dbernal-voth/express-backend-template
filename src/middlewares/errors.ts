import { Request, Response, NextFunction } from "express";
import config from "../config";
//import Logger from '../Logger'

export function logErrors(
  err: Error,
  _req: Request,
  _res: Response,
  next: NextFunction
) {
  if (config.dev) {
    console.error("- - - - - - - - - - - - - - - - - - - - - - - - - - - -");
    console.error(err);
    /* console.error({
      error: err.message,
      stack: err.stack,
    }); */
    console.error("- - - - - - - - - - - - - - - - - - - - - - - - - - - -");
  }
  next(err);
}

function withErrorStack(messageToSend: any, stack?: string) {
  if (config.dev) {
    return { ...messageToSend, stack };
  }
  return messageToSend;
}

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const statusCode = res.statusCode || 500;
  /* const {
    output: { statusCode, payload },
  } = err; */
  if (statusCode === 500) {
    //Logger.error(err.stack);
  }

  const messageToSend = {
    message: err.message || "error inesperado",
    error: "error inesperado",
  };
  res.status(statusCode === 200 ? 500 : statusCode);
  res.json(withErrorStack(messageToSend, err.stack));
  next();
}
