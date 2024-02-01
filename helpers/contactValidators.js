import { createContactSchema, updateContactSchema, updateStatusContactSchema } from "../schemas/contactsSchemas.js";

export const createContactDataValidator = (data) => createContactSchema.validate(data);

export const updateContactDataValidator = (data) => updateContactSchema.validate(data);

export const updateStatusContactValidator = (data) => updateStatusContactSchema.validate(data);

