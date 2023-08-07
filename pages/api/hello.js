const { MongoClient } = require("mongodb");

const uri = process.env.DATABASE_URL;

const client = new MongoClient(uri);

async function addData(collection, data) {
  try {
    const database = client.db('Progress');
    const coll = database.collection(collection);
    await coll.insertOne(data)
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}


export default function handler(req, res) {
    run()
    res.status(200).json('Hello, this is your API response!');
  }