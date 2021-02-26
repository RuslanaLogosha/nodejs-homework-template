const db = require('./db');
const {ObjectID} = require('mongodb');

const getCollection = async (db, name)=> {
  try {
    const client = await db;
    const collection = await client.db().collection(name);
    return collection;
 
  } catch (error) {
    console.log('Error:', error);
  }
}

const getAllContacts = async () => {
 const collection = await getCollection(db, 'contacts');
 const results = await collection.find({}).toArray();
 return results;
}

const getContactById = async (id) => {
  try {
    const collection = await getCollection(db, 'contacts');
    const objectId = new ObjectID(id);
    console.log(objectId.getTimestamp())
    const [result] = await collection.find({_id: objectId}).toArray();
    return result;
  } catch (error) {
    console.log('Error:', error);
  }
}

const addContact = async ({ name, email, phone }) => {
  try {
    const collection = await getCollection(db, 'contacts');
    const newContact = { name, email, phone };
    const {ops: [result]} = await collection.insertOne(newContact);
    return result;
  } catch (error) {
    console.log('Error:', error);
  }
}

const updateContact = async (id, body) => {
  const collection = await getCollection(db, 'contacts');
  const objectId = new ObjectID(id);
  const {value: result} = await collection.findOneAndUpdate(
    {_id: objectId},
    {$set: body},
    {returnOriginal: false},
    )
    return result;
}

const removeContact = async (id) => {
  const collection = await getCollection(db, 'contacts');
  const objectId = new ObjectID(id);
  const {value: result} = await collection.findOneAndDelete(
    {_id: objectId},
    )
    return result;
}

module.exports = {
  getAllContacts,
  getContactById,
  addContact,
  updateContact,
  removeContact,
};
