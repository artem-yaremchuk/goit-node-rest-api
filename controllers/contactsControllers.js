import {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
} from "../services/contactsServices.js";

import catchAsync from "../helpers/catchAsync.js";

export const getAllContacts = catchAsync(async (req, res) => {
  const { total, contacts } = await listContacts(req.query, req.user);

  res.status(200).json({ total, contacts });
});

export const getOneContact = catchAsync(async (req, res) => {
  const { id } = req.params;
  const contact = await getContactById(id);

  res.status(200).json(contact);
});

export const deleteContact = catchAsync(async (req, res) => {
  const { id } = req.params;
  const removedContact = await removeContact(id);

  res.status(200).json(removedContact);
});

export const createContact = catchAsync(async (req, res) => {
  const newContact = await addContact(req.body, req.user);

  res.status(201).json(newContact);
});

export const updateOneContact = catchAsync(async (req, res) => {
  const { id } = req.params;

  const updatedContact = await updateContact(id, req.body);

  res.status(200).json(updatedContact);
});

export const updateStatus = catchAsync(async (req, res) => {
  const { id } = req.params;

  const updatedContact = await updateStatusContact(id, req.body);

  res.status(200).json(updatedContact);
});
