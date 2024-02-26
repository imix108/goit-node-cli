import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";


const updateContacts = (contacts) =>
    fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  
const contactsPath = path.resolve("db", "contacts.json");

async function listContacts() {
    const data = await fs.readFile(contactsPath, 'utf-8');
    return JSON.parse(data);
}

async function getContactById(contactId) {
    const contacts = await listContacts();
    return contacts.find(contact => contact.id === contactId) || null;
} 

async function removeContact(contactId) {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) {
    return null;
  }
  const [result] = contacts.splice(index, 1);
  await updateContacts(contacts);
  return result;
}

async function addContact(data) {
  const contacts = await listContacts();
  const newContact = { id: nanoid(), ...data };
  const updatedContacts = [...contacts, newContact];
  await updateContacts(updatedContacts);
  return newContact;
}

export { listContacts, getContactById, removeContact, addContact };