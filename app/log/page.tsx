'use client'
import Link from "next/link";
import { useEffect, useState } from "react";
var cookieCutter = require('cookie-cutter');

// cookie.js
const getCookie = (key) => {
  const cookies = document.cookie.split('; ');
  for (const cookie of cookies) {
    const [cookieKey, cookieValue] = cookie.split('=');
    if (cookieKey === key) {
      return cookieValue;
    }
  }
  return null;
};

export { getCookie };



export default function Log() {
    const [signedIn, setSignedin] = useState(false)
    const [split, setSplit] = useState("")
    const [userName, setName] = useState("")
    useEffect(() => {
      const authToken = getCookie('userName');
      if (authToken != null) {
        setSignedin(true)
        setName(authToken)
      }
    }, []);

    return (      
      <main>
        {signedIn ?
        <>
        <h2>{"Log your progress here, " + userName + "!"}</h2>
        <details>
          <summary>Tips:</summary>
          This is designed for only one workout a day. This means that the app will only log your data <b>once per day</b>. 
          If you try to log twice in one day, it will just <b>overwrite your old save</b>. You can use this to your advantage if you accidently
          enter the wrong information
        </details>
        <br></br>
        <label>What split were you doing today?</label>
       
        <select onChange={(e) => setSplit(e.target.value)}>
            <option>Select an option</option>
            <option>Push (Biceps, Back)</option>
            <option>Pull (Triceps, Chest, Shoulders)</option>
            <option>Leg</option>
        </select>
        </>
        :
        <>
        <h3>You are not signed in!</h3>
        <Link href="/account">Click me to sign in!</Link>
        </>}
        
      </main>
    )
  }
  