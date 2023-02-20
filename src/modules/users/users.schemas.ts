import Joi from "joi";

export const userIdSchema = Joi.object({
  userId: Joi.number().required(),
});

export const usernameSchema = Joi.object({
  username: Joi.string().required(),
});

export const searchSchema = Joi.object({
  search: Joi.string().optional(),
});

export const passwordSchema = Joi.object({
  password: Joi.string().required(),
});

export const userCreationSchema = Joi.object({
  name: Joi.string().required(),
  username: Joi.string().required(),
  password: Joi.string().required(),
  // TODO: Validar correctamente los permisos
  permissions: Joi.array().items(
    Joi.array().items(Joi.alternatives().try(Joi.number(), Joi.string()))
  ),
});

export const userUpdateSchema = Joi.object({
  name: Joi.string().required(),
  // TODO: Validar correctamente los permisos
  permissions: Joi.array().items(
    Joi.array().items(Joi.alternatives().try(Joi.number(), Joi.string()))
  ),
});
