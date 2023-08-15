import { serialize } from "cookie";
import { insertDocument, findDocuments } from '../../utils/dbOperations';
const { randomBytes, scryptSync, timingSafeEqual } = require("crypto")

async function findUser(username) {
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
        const user = req.query.user
        const password = req.query.pwd
        findUser(user).then(response => {
            if (response.length != 0) {
                response = response[0]
                const [salt, key] = response.secret.split(":")
                const hashedBuffer = scryptSync(password, salt, 64);
                const keyBuffer = Buffer.from(key, "hex")
                const match = timingSafeEqual(hashedBuffer, keyBuffer)

                if (match) {
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
                        error : "Wrong Password!"
                    });
                }
                
                
            } else {
                res.status(401).json({
                    success : false,
                    error : "Username/Password wrong or user does not exist!"
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

