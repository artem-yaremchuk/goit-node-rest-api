import HttpError from "../helpers/HttpError.js";
import { Contact } from "../models/contactModel.js";

async function listContacts() {
  try {
    const contacts = await Contact.find();
    
    return contacts;
  } catch (err) {
    throw HttpError(500, "Error reading or writing contacts file");
  }
}

async function getContactById(id) {
  try {
    const contact = Contact.findById(id);

    return contact;
  } catch (err) {
    throw HttpError(500, "Error reading or writing contacts file");
  }
}

async function removeContact(id) {
  try {
    const removedContact = Contact.findByIdAndDelete(id);

    return removedContact;
  } catch (err) {
    throw HttpError(500, "Error reading or writing contacts file");
  }
}

async function addContact(value) {
  try {
    const newContact = await Contact.create(value);

    return newContact;
  } catch (err) {
    throw HttpError(500, "Error reading or writing contacts file");
  }
}

async function updateContact(id, value) {
  try {
    const updatedContact = Contact.findByIdAndUpdate({ _id: id }, value, {
      new: true,
    });

    return updatedContact;
  } catch (err) {
    throw HttpError(500, "Error reading or writing contacts file");
  }
}

async function updateStatusContact(id, value) {
  try {
    const updatedStatusContact = Contact.findByIdAndUpdate({ _id: id }, value, {
      new: true,
    });

    return updatedStatusContact;
  } catch (err) {
    throw HttpError(500, "Error reading or writing contacts file");
  }
}

export {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};
