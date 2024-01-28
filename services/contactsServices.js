import { promises as fs } from "fs";
import { join } from "path";
import { nanoid } from "nanoid";
import HttpError from "../helpers/HttpError.js";

const contactsPath = join("db", "contacts.json");

async function listContacts() {
  try {
    const readJsonResult = await fs.readFile(contactsPath);

    const dataArr = JSON.parse(readJsonResult);

    return dataArr;
  } catch (err) {
    console.log(err);
    throw HttpError(500, "Error reading or writing contacts file");
  }
}

async function getContactById(contactId) {
  try {
    const readJsonResult = await fs.readFile(contactsPath);

    const dataArr = JSON.parse(readJsonResult);

    return dataArr.find((contact) => contact.id === contactId) || null;
  } catch (err) {
    throw HttpError(500, "Error reading or writing contacts file");
  }
}

async function removeContact(contactId) {
  try {
    const readJsonResult = await fs.readFile(contactsPath);

    const dataArr = JSON.parse(readJsonResult);
    const index = dataArr.findIndex((contact) => contact.id === contactId);

    if (index === -1) {
      return null;
    }

    const removedContact = dataArr[index];
    dataArr.splice(index, 1);

    await fs.writeFile(contactsPath, JSON.stringify(dataArr));

    return removedContact;
  } catch (err) {
    throw HttpError(500, "Error reading or writing contacts file");
  }
}

async function addContact(name, email, phone) {
  try {
    const readJsonResult = await fs.readFile(contactsPath);

    const dataArr = JSON.parse(readJsonResult);
    dataArr.push({ id: nanoid(), name, email, phone });

    await fs.writeFile(contactsPath, JSON.stringify(dataArr));

    return dataArr[dataArr.length - 1];
  } catch (err) {
    throw HttpError(500, "Error reading or writing contacts file");
  }
}

async function updateContact(id, value) {
  try {
    const readJsonResult = await fs.readFile(contactsPath);

    const dataArr = JSON.parse(readJsonResult);
    const index = dataArr.findIndex((contact) => contact.id === id);

    if (index === -1) {
      return null;
    }

    const updatedContact = { ...dataArr[index], ...value };
    
    dataArr.splice(index, 1, updatedContact);

    await fs.writeFile(contactsPath, JSON.stringify(dataArr));

    return updatedContact;
  } catch (err) {
    throw HttpError(500);
  }
}

export {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
