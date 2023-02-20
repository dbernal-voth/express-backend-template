import type { Request, Response, NextFunction } from "express";
import APIResponse from "helpers/Responses";

type Permissions = [string, number][];

function scopeValidation(allowedScopes: Permissions) {
  return function (_: Request, res: Response, next: NextFunction) {
    if (!res.locals?.user || !res.locals?.user?.permissions) {
      return APIResponse.unauthorized(res);
    }
    const permissions = <Permissions>res.locals?.user.permissions;

    const hasAccess = allowedScopes.some((necessaryPermission) => {
      return permissions.some((permission) => {
        return (
          permission[0] === necessaryPermission[0] &&
          permission[1] >= necessaryPermission[1]
        );
      });
    });

    if (hasAccess) return next();
    return APIResponse.unauthorized(res);
  };
}

export default scopeValidation;
