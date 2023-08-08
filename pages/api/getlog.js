import { serialize } from "cookie";
import { insertDocument, findDocuments } from '../../utils/dbOperations';
import { cookies } from 'next/headers'

async function findUser(username, password) {
    try {
      const query = {
        username: username,
        secret: password,
      };
      return await findDocuments("Users", query)
      
    } catch (error) {
      console.error('Error finding user:', error);
    } 
}



export default async function handler(req, res) {
    if (req.cookies.id) {
      if (req.query.split) {
        
      }
    }
    res.status(404).json({
      success : false
  });
  }

  // pages/api/hello.ts

