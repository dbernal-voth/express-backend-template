/* import express from "express";
import type { User } from "@prisma/client";

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}
 */

import core from "express-serve-static-core";
import type { User } from "@prisma/client";

interface ResLocals {
  user: User;
}

declare module "express" {
  export interface Response<
    ResBody = any,
    Locals extends Record<string, any> = Record<string, any>
  > extends core.Response<ResBody, Locals> {
    locals: ResLocals & Locals;
  }
}
