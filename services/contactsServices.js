import { Contact } from "../models/contactModel.js";

async function listContacts() {
  const contacts = await Contact.find();

  return contacts;
}

async function getContactById(id) {
  const contact = Contact.findById(id);

  return contact;
}

async function removeContact(id) {
  const removedContact = Contact.findByIdAndDelete(id);

  return removedContact;
}

async function addContact(contactData) {
  const newContact = await Contact.create(contactData);

  return newContact;
}

async function updateContact(id, contactData) {
  const updatedContact = Contact.findByIdAndUpdate({ _id: id }, contactData, {
    new: true,
  });

  return updatedContact;
}

async function updateStatusContact(id, contactStatus) {
  const updatedStatusContact = Contact.findByIdAndUpdate(
    { _id: id },
    contactStatus,
    {
      new: true,
    },
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
