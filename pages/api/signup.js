import { serialize } from "cookie";
import { insertDocument, findDocuments } from '../../utils/dbOperations';
const { randomBytes, scryptSync } = require("crypto")

async function createUser(username, password) {
    try {
        const salt = randomBytes(16).toString("hex")
        const hashedPassword = scryptSync(password, salt, 64).toString("hex")
      const newUser = {
        username: username,
        secret: `${salt}:${hashedPassword}`,
        createdAt: new Date(),
      };
      return await insertDocument("Users", newUser)
      
    } catch (error) {
      console.error('Error creating user:', error);
    } 
}

async function findUserName(username) {
    try {
      const query = {
        username: username
      };
      return await findDocuments("Users", query)
      
    } catch (error) {
      console.error('Error finding user:', error);
    } 
}



export default async function handler(req, res) {
    if (req.query.user && req.query.pwd) {
        findUserName(req.query.user).then(response => {
            if (response.length == 0) {
                createUser(req.query.user, req.query.pwd).then(response => {
                    insertDocument("Records", {
                        _id : response.insertedId,
                        push : {
                            "entries" : 0,
                            "exercises" : [],
                            "logs" : {}
                            },
                        pull : {
                            "entries" : 0,
                            "exercises" : [],
                            "logs" : {}
                            },
                        leg : {
                            "entries" : 0,
                            "exercises" : [],
                            "logs" : {}
                            }
                    })
                    if (response.acknowledged) {
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
                res.status(401).json({
                    success : false,
                    error : "Username is already being used!"
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

