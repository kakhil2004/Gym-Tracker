const { MongoClient } = require("mongodb");
import { serialize } from "cookie";

const uri = process.env.DATABASE_URL;

const client = new MongoClient(uri);

async function createUser(username, hashedPassword) {
    try {
      await client.connect();
      const database = client.db('Progress');
      const usersCollection = database.collection('Users');
  
      const newUser = {
        username: username,
        secret: hashedPassword,
        createdAt: new Date(),
      };
  
      return await usersCollection.insertOne(newUser);
      
    } catch (error) {
      console.error('Error creating user:', error);
    } finally {
      await client.close();
    }
}



export default async function handler(req, res) {
    if (req.query.user && req.query.pwd) {
        createUser(req.query.user, req.query.pwd).then(response => {
            if (response.acknowledged) {
                const cookie = serialize("id", response.insertedId, {
                    httpOnly: true
                  });
                res.setHeader("Set-Cookie", cookie)
                res.status(200).json({
                    success : true
                });
            } else {
                res.status(401).json({
                    success : false
                });
            }
        })
    } else {
        res.status(404).json({
            success : false
        });
    }
    
  }

  // pages/api/hello.ts

