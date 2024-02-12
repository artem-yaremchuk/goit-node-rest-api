import { Contact } from "../models/contactModel.js";

async function listContacts(owner) {
  const contacts = await Contact.find({ owner });

  return contacts;
}

async function getContactById(id) {
  const contact = await Contact.findById(id);

  return contact;
}

async function removeContact(id) {
  const removedContact = await Contact.findByIdAndDelete(id);

  return removedContact;
}

async function addContact(contactData, owner) {
  const newContact = await Contact.create({ ...contactData, owner });

  return newContact;
}

async function updateContact(id, contactData) {
  const updatedContact = await Contact.findByIdAndUpdate(id, contactData, {
    new: true,
  });

  return updatedContact;
}

async function updateStatusContact(id, contactStatus) {
  const updatedStatusContact = await Contact.findByIdAndUpdate(
    id,
    contactStatus,
    { new: true },
  );

  return updatedStatusContact;
}

export {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};
