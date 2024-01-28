import { createContactSchema, updateContactSchema } from "../schemas/contactsSchemas.js";

export const createUserDataValidator = (data) => createContactSchema.validate(data);

export const updateUserDataValidator = (data) => updateContactSchema.validate(data);