import {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} from "../services/contactsServices.js";

import catchAsync from "../helpers/catchAsync.js";
import HttpError from "../helpers/HttpError.js";
import {
  createUserDataValidator,
  updateUserDataValidator,
} from "../helpers/userValidators.js";

export const getAllContacts = catchAsync(async (req, res) => {
  const contacts = await listContacts();

  res.status(200).json(contacts);
});

export const getOneContact = catchAsync(async (req, res) => {
  const { id } = req.params;
  const contact = await getContactById(id);

  if (!contact) throw HttpError(404);

  res.status(200).json(contact);
});

export const deleteContact = catchAsync(async (req, res) => {
  const { id } = req.params;
  const removedContact = await removeContact(id);

  if (!removedContact) throw HttpError(404);

  res.status(200).json(removedContact);
});

export const createContact = catchAsync(async (req, res) => {
  const { value, error } = createUserDataValidator(req.body);

  if (error) throw HttpError(400, error.message);

  const { name, email, phone } = value;

  const newContact = await addContact(name, email, phone);

  res.status(201).json(newContact);
});

export const updateOneContact = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { name, email, phone } = req.body;
  if (!name && !email && !phone)
    throw HttpError(400, "Body must have at least one field");

  const { value, error } = updateUserDataValidator(req.body);

  if (error) throw HttpError(400, error.message);

  const updatedContact = await updateContact(id, value);

  if (!updatedContact) throw HttpError(404);

  res.status(200).json(updatedContact);
});
