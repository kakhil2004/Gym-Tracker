'use client'
import Link from "next/link";
import { useEffect, useState } from "react";
import LineChart from "@/components/chart";
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

    const chartData = {
      labels: [
        'Split',
        'Push',
        'Pull'
      ],
      datasets: [{
        label: '',
        data: [300, 50, 100],
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(255, 205, 86)'
        ],
        hoverOffset: 4
      }]
    };
    

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
        <h2>{"Lets visualize your progress, " + userName + "!"}</h2>
        <details>
          <summary>Tips:</summary>
          This is still under work, please reach out to me if you have suggestions or any bugs!
        </details>
        <br></br>
        <label>What split were you doing today?</label>
       
        <select onChange={(e) => setSplit(e.target.value)}>
            <option>Select an option</option>
            <option>Push (Biceps, Back)</option>
            <option>Pull (Triceps, Chest, Shoulders)</option>
            <option>Leg</option>
        </select>

        <LineChart data={chartData} />
        </>
        :
        <>
        <h3>You are not signed in!</h3>
        <Link href="/account">Click me to sign in!</Link>
        </>}
        
      </main>
    )
  }
  