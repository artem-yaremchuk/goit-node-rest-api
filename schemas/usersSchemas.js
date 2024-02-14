import Joi from "joi";

const PASSWD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#_\\$%\\^&\\*])(?=.{8,128})/;

export const registerUserSchema = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required()
    .messages({
      "string.empty": "Email cannot be empty",
      "string.email": "Enter a valid email address",
      "any.required": "Email is required",
    }),
  password: Joi.string().regex(PASSWD_REGEX).required().messages({
    "string.empty": "Password cannot be empty",
    "any.required": "Password is required",
    "string.pattern.base": "Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character",
  }),
});

export const loginUserSchema = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required()
    .messages({
      "string.empty": "Email cannot be empty",
      "string.email": "Enter a valid email address",
      "any.required": "Email is required",
    }),
  password: Joi.string().regex(PASSWD_REGEX).required().messages({
    "string.empty": "Password cannot be empty",
    "any.required": "Password is required",
    "string.pattern.base": "Invalid password",
  }),
});
