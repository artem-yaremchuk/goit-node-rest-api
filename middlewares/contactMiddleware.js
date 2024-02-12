import { Types } from "mongoose";

import HttpError from "../helpers/HttpError.js";
import catchAsync from "../helpers/catchAsync.js";
import { Contact } from "../models/contactModel.js";
import {
  createContactDataValidator,
  updateContactDataValidator,
  updateStatusContactValidator,
} from "../helpers/contactValidators.js";

export const checkCreateContactData = (req, res, next) => {
  const { value, error } = createContactDataValidator(req.body);

  if (error) throw HttpError(400, error.message);

  req.body = value;

  next();
};

export const checkUpdateContactData = (req, res, next) => {
  const { name, email, phone } = req.body;
  if (!name && !email && !phone)
    throw HttpError(400, "Body must have at least one field");

  const { value, error } = updateContactDataValidator(req.body);

  if (error) throw HttpError(400, error.message);

  req.body = value;

  next();
};

export const checkUpdateStatus = (req, res, next) => {
  const { value, error } = updateStatusContactValidator(req.body);

  if (error) throw HttpError(400, error.message);

  req.body = value;

  next();
};

export const checkContactId = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const isIdValid = Types.ObjectId.isValid(id);

  if (!isIdValid) throw HttpError(400, "Your Id is not valid");

  const contactExists = await Contact.exists({ _id: id });

  if (!contactExists) throw HttpError(404);

  next();
});

export const checkOwner = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const owner = req.user;

  const contactExists = await Contact.exists({ _id: id, owner });

  if (!contactExists) throw HttpError(404);

  next();
});
