import { Router } from "express";
import PERMISSIONS from "constants/permissions";
import scopeValidation from "middlewares/scopeValidation";
import validationHandler from "middlewares/validation";
import asyncHandlerError from "helpers/asyncHanlderErrror";
import UsersController from "./users.controller";
import {
  userIdSchema,
  searchSchema,
  passwordSchema,
  userCreationSchema,
  userUpdateSchema,
} from "./users.schemas";

export default function usersRoutes(app: Router) {
  const router = Router();
  app.use("/users", router);

  const usersController = new UsersController();

  router.get(
    "/:userId",
    scopeValidation([[PERMISSIONS.USERS, 1]]),
    validationHandler(userIdSchema, "params"),
    asyncHandlerError(usersController.getUserById)
  );

  router.post(
    "/search",
    scopeValidation([[PERMISSIONS.USERS, 1]]),
    validationHandler(searchSchema),
    asyncHandlerError(usersController.search)
  );

  router.put(
    "/:userId/password",
    scopeValidation([[PERMISSIONS.USERS, 2]]),
    validationHandler(userIdSchema, "params"),
    validationHandler(passwordSchema),
    asyncHandlerError(usersController.updatePassword)
  );

  router.post(
    "/disable/:userId",
    scopeValidation([[PERMISSIONS.USERS, 2]]),
    validationHandler(userIdSchema, "params"),
    asyncHandlerError(usersController.disableUser)
  );

  router.post(
    "/",
    scopeValidation([[PERMISSIONS.USERS, 2]]),
    validationHandler(userCreationSchema),
    asyncHandlerError(usersController.create)
  );

  router.put(
    "/:userId",
    scopeValidation([[PERMISSIONS.USERS, 2]]),
    validationHandler(userIdSchema, "params"),
    validationHandler(userUpdateSchema),
    asyncHandlerError(usersController.update)
  );
}
