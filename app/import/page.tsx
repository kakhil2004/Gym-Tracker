'use client'
import Link from "next/link";
import { useEffect, useState } from "react";
import Image from 'next/image'
import Checker from "@/components/checker";
import copy from 'copy-to-clipboard';


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



export default function Import() {
    const [signedIn, setSignedin] = useState(false)
    const [copyToClip, setCopied] = useState(false)
    const [userName, setName] = useState("")
    const [data, setData] = useState("")
    const [cleanData, setCData] = useState(null)

    function copyToClipBoard() {
      setCopied(true)
      copy("Split Name \n\nWorkout #1 Name\nweight - reps \nweight - reps \n\nWorkout #2 Name \nweight - reps \nweight - reps \nweight - reps \n\nComments:")
      setTimeout(() => {setCopied(false)}, 3000)
      
    }

    function saveData() {
      let copy = data.trim().replaceAll("\n\n", "\n").toLowerCase().split("\n")
      console.log(copy)
      let final = {
        "sp" : "",
        "wos" : [],
        "cm" : ""
      }
      let split;
      if (copy[0] === "push" || copy[0] === "pull" || copy[0] === "legs") {
        final.sp = copy[0]
        for (let i = 1; i < copy.length; i++) {
          let curr = copy[i];
          if (isNaN(Number(curr.charAt(0)))) {
            if (curr.startsWith("comments:")) {
              final.cm = curr.substring(9).trim();
            } else {
              let currWorkout = {
                "name" : curr,
                "wo" : []
              }
              i++
              while(!isNaN(Number(copy[i].charAt(0)))) {
                let currWo = copy[i].replace(" ", "").split("-")
                currWorkout.wo.push({"w" : Number(currWo[0]), "r" : Number(currWo[1])})
                i++
              }
              i--;
              final.wos.push(currWorkout)
            }
            
          }
        }
      }
      setCData(final)
      console.log(final)

    }

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
        <h2>Import progress from notes app!</h2>
        <details>
        <summary><b>How to use this tool (New People read this)</b></summary>
          <br></br>
          <ol type="1">
            <li>
              <p>Record your progress in the following schema </p>
              <button onClick={copyToClipBoard}>{copyToClip ? "Copied!" : "Click me to copy format"}</button>
              <br></br>
              <br></br>
              <Image src="/importSchema.png" key="" alt="broke" width="300" height="200"/>
              <details>
              <summary>Example of this:</summary>
              <Image src="/importExample.png" key="" alt="broke" width="300" height="200"/>
              </details>
              <br></br>
            </li>
            <li>
            <p>Copy all the content by clicking Share &#8594; Copy</p>
            </li>
            <li>
            <p>Paste the content below!</p>
              </li>
          </ol>
        
        </details>
        <br></br>
        <label>Paste Content here!</label>
       
        <textarea style={{height : 300}} onChange={(e) => setData(e.target.value)}>
        </textarea>
        <button onClick={saveData}>Submit Data!</button>
        {cleanData && <Checker data={cleanData}/>}
        </>
        :
        <>
        <h3>You are not signed in!</h3>
        <Link href="/account">Click me to sign in!</Link>
        </>}
        
      </main>
    )
  }
  