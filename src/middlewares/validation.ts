import { NextFunction, Request, Response } from "express";
import { AnySchema } from "joi";
import APIResponse from "helpers/Responses";

function validate(schema: AnySchema, objData: unknown) {
  const options = {
    abortEarly: false, // include all errors
    allowUnknown: true, // ignore unknown props
    stripUnknown: true, // remove unknown props
  };
  const { error } = schema.validate(objData, options);
  if (error)
    return `Validation error: ${error.details
      .map((x: any) => x.message)
      .join(", ")}`;
}

const validationHandler = (
  schema: AnySchema,
  check: "params" | "query" | "body" = "body"
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (check !== "params" && check !== "query" && check !== "body") {
      throw new Error("Require [params, query or body]");
    }
    const objData = req[check];
    const error = validate(schema, objData);
    if (error) {
      return APIResponse.badRequest(res, error);
    }
    next();
  };
};

export default validationHandler;
