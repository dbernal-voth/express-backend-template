import { Response } from "express";

const statusCode = {
  listed: 200,
  created: 201,
  updated: 200,
  deleted: 200,
  badRequest: 400,
  unauthorized: 401,
  conflict: 409,
  internalError: 500,
};

interface Res extends Response {
  withAPIResponse?: boolean;
}

type AnyObject = Record<string, unknown>;

class Responses {
  static listed<T>(
    res: Res,
    data?: T | AnyObject | AnyObject[],
    message?: string
  ) {
    if (res.withAPIResponse) return;
    res.status(statusCode.listed).json({
      data: data || false,
      message: message || "Listado con exito",
    });
    res.withAPIResponse = true;
  }

  static created<T>(
    res: Res,
    data?: T | AnyObject | AnyObject[],
    message?: string
  ) {
    if (res.withAPIResponse) return;
    res.status(statusCode.created).json({
      data: data || false,
      message: message || "Creado con exito",
    });
    res.withAPIResponse = true;
  }

  static updated<T>(
    res: Res,
    data?: T | AnyObject | AnyObject[],
    message?: string
  ) {
    if (res.withAPIResponse) return;
    res.status(statusCode.updated).json({
      data: data || false,
      message: message || "Actualizado con exito",
    });
    res.withAPIResponse = true;
  }

  static deleted<T>(
    res: Res,
    data?: T | AnyObject | AnyObject[],
    message?: string
  ) {
    if (res.withAPIResponse) return;
    res.status(statusCode.deleted).json({
      data: data || false,
      message: message || "Eliminado con exito",
    });
    res.withAPIResponse = true;
  }

  static badRequestMessage(message?: string) {
    return {
      statusCode: statusCode.badRequest,
      error: "Bad Request",
      message: message || "Datos erróneos o incompletos.",
    };
  }

  static badRequest(res: Res, message?: string) {
    if (res.withAPIResponse) return;
    res
      .status(statusCode.badRequest)
      .json(Responses.badRequestMessage(message));
    res.withAPIResponse = true;
  }

  static unauthorized(res: Res, message?: string) {
    if (res.withAPIResponse) return;
    res.status(statusCode.unauthorized).json({
      statusCode: statusCode.unauthorized,
      error: "Unauthorized",
      message: message || "Permisos insuficientes",
    });
    res.withAPIResponse = true;
  }

  static conflict(res: Res, message?: string) {
    if (res.withAPIResponse) return;
    res.status(statusCode.conflict).json({
      statusCode: statusCode.conflict,
      error: "Conflict",
      message: message || "El elemento ya existe",
    });
    res.withAPIResponse = true;
  }

  static internalError(res: Res, message?: string | unknown) {
    if (res.withAPIResponse) return;
    res.status(statusCode.internalError).json({
      statusCode: statusCode.internalError,
      error: "InternalError",
      message: message || "Ha ocurrido un error",
    });
    res.withAPIResponse = true;
  }
}

export default Responses;
