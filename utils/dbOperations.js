import client from './dbConnect';

export async function insertDocument(collectionName, document) {
    const db = client.db("Progress")
    const collection = db.collection(collectionName);
    const result = await collection.insertOne(document)
    return result;
}

export async function findDocuments(collectionName, query) {
    const db = client.db("Progress")
    const collection = db.collection(collectionName);
    const result = await collection.find(query).toArray();
    return result;
}
