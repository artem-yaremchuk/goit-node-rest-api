import Joi from "joi";

export const createContactSchema = Joi.object({
  name: Joi.string().trim().min(3).max(30).required().messages({
    "string.empty": "Name cannot be empty",
    "string.min": "Name must be at least {#limit} characters long",
    "string.max": "Name must not be more than {#limit} characters long",
    "any.required": "Name is required",
  }),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required()
    .messages({
      "string.empty": "Email cannot be empty",
      "string.email": "Enter a valid email address",
      "any.required": "Email is required",
    }),
  phone: Joi.string().trim().min(10).max(14).required().messages({
    "string.empty": "Phone number cannot be empty",
    "string.min": "Phone number must be at least {#limit} digits long",
    "string.max": "Phone number must not be more than {#limit} digits long",
    "any.required": "Phone number is required",
  }),
});

export const updateContactSchema = Joi.object({
  name: Joi.string().trim().min(3).max(30).messages({
    "string.min": "Name must be at least {#limit} characters long",
    "string.max": "Name must not be more than {#limit} characters long",
  }),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .messages({
      "string.email": "Enter a valid email address",
    }),
  phone: Joi.string().trim().min(10).max(14).messages({
    "string.min": "Phone number must be at least {#limit} digits long",
    "string.max": "Phone number must not be more than {#limit} digits long",
  }),
});

export const updateStatusContactSchema = Joi.object({
  favorite: Joi.boolean().required().messages({
      "any.required": "Favorite is required",
      "boolean.base": "Favorite must be a boolean value",
  }),
});
