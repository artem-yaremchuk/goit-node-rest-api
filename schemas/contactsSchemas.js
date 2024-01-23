import Joi from "joi";

export const createContactSchema = Joi.object({
  name: Joi.string().trim().min(3).max(30).required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),
  phone: Joi.string().trim().min(10).max(14).required(),
});

export const updateContactSchema = Joi.object({
  name: Joi.string().trim().min(3).max(30),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
  phone: Joi.string().trim().min(10).max(14),
});
