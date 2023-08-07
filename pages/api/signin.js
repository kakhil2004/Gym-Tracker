import { serialize } from "cookie";
import { insertDocument, findDocuments } from '../../utils/dbOperations';


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
    if (req.query.user && req.query.pwd) {
        findUser(req.query.user, req.query.pwd).then(response => {
            if (response.length != 0) {
                response = response[0]
                let expirationDate = 60 * 60 * 24 * 7;
                res.setHeader("Set-Cookie", [
                    serialize('id', response._id, {
                        httpOnly: true,
                        maxAge: expirationDate,
                        path: '/',
                    }),
                    serialize('userName', response.username, {
                        httpOnly : false,
                        maxAge: expirationDate,
                        path: '/',
                    })
                ])
                res.status(200).json({
                    success : true
                });
            } else {
                res.status(401).json({
                    success : false,
                    error : "No user found!"
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

