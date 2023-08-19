const { MongoClient, Logger, ObjectId } = require('mongodb');
const AWS = require('aws-sdk');
const ssm = new AWS.SSM();
require('dotenv').config();

const mongoOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  loggerLevel: 'debug',
};

let database = null;
const dbName = process.env.MONGODB_DBNAME; 
const collectionName = 'tbl_employee'; 


const connectMongo = async (dbName, collectionName) => {
  try {
    if (database && database.serverConfig.isConnected()) {
      console.log('Connected with existing con');
      return client.db(dbName).collection(collectionName)
    }

    const mongodbURISecret = process.env.MONGODB_URI;
    const client = await MongoClient.connect(mongodbURISecret, mongoOptions);
    console.log('Connected to MongoDB');
    database = client.db(dbName);
    return client.db(dbName).collection(collectionName)
    
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
      throw error;
  }
};

const insertOne = async (data) => {
  const collection = await connectMongo(dbName, collectionName);
  try {
    data = { ...data, created_on: new Date(), updated_on: new Date() };
    const result = await collection.insertOne(data);
    return result.insertedId;
  } catch (error) {
    console.error('Error inserting document:', error);
    throw error;
  }
};

const insertMany = async (data) => {
  const collection = await connectMongo(dbName, collectionName);
  try {
    data = Array.isArray(data)
      ? data.map(i => ({ ...i, created_on: new Date(), updated_on: new Date() }))
      : [data].map(i => ({ ...i, created_on: new Date(), updated_on: new Date() }));

    const result = await collection.insertMany(data);
    return result.insertedIds;
  } catch (error) {
    console.error('Error inserting multiple documents:', error);
    throw error;
  }
};

const findOne = async (query) => {
  const collection = await connectMongo(dbName, collectionName);
  try {
    const document = await collection.findOne(query);
    return document;
  } catch (error) {
    console.error('Error finding document:', error);
    throw error;
  }
};

const findMany = async (query) => {
  const collection = await connectMongo(dbName, collectionName);
  try {
    const documents = await collection.find(query).toArray();
    return documents;
  } catch (error) {
    console.error('Error finding documents:', error);
    throw error;
  }
};

module.exports = {
  insertOne,
  insertMany,
  findOne,
  findMany,
};