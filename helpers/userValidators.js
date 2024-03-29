import { registerUserSchema, verifyUserSchema, loginUserSchema } from "../schemas/usersSchemas.js";

export const registerDataValidator = (data) => registerUserSchema.validate(data);

export const verifyDataValidator = (data) => verifyUserSchema.validate(data);

export const loginDataValidator = (data) => loginUserSchema.validate(data);