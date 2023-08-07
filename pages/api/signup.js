import { serialize } from "cookie";
import { insertDocument, findDocuments } from '../../utils/dbOperations';


async function createUser(username, password) {
    try {
      const newUser = {
        username: username,
        secret: password,
        createdAt: new Date(),
      };
      return await insertDocument("Users", newUser)
      
    } catch (error) {
      console.error('Error creating user:', error);
    } 
}



export default async function handler(req, res) {
    if (req.query.user && req.query.pwd) {
        createUser(req.query.user, req.query.pwd).then(response => {
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
        res.status(404).json({
            success : false
        });
    }
    
  }

  // pages/api/hello.ts

