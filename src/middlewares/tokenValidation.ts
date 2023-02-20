import { User } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import passport from "passport";
import config from "config";
import APIResponse from "helpers/Responses";

require("../strategies/jwt");

async function tokenValidation(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const cbUser = (error: Request, user: User) => {
    if (error) {
      next(new Error("Ha ocurrido un error"));
      return APIResponse.internalError(res);
    }
    if (error || !user) {
      return APIResponse.unauthorized(res);
    }
    res.locals.user = { ...user };
    next();
  };

  if (config.dev) console.log(req.url);

  if (req.url.slice(0, 9) === "/api/auth") {
    next();
  } else {
    passport.authenticate("jwt", { session: false }, cbUser)(req, res, next);
  }
}

export default tokenValidation;
