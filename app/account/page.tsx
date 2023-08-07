'use client'
import { useState } from "react";


const DynamicContent = ({ items }) => {
  return (
    <div>
      {items.map((item, index) => (
        <div key={index}>
          {item.type === 'text' && <p>{item.content}</p>}
          {item.type === 'button' && <a href="/log"><button>Start Tracking!</button></a>}
        </div>
      ))}
    </div>
  );
};


export default function SignUp() {
    const [user, setUserValue] = useState("")
    const [pwd, setPwdValue] = useState("")
    const [samPwd, setSameValue] = useState(true)
    const [dynamicItems, setDynamic] = useState([])
    //1 = signupMode 2 = signin for first time 0 = regular signin
    const [signup, setSignUp] = useState(1)
    
    function switchMode() {
      signup == 1 ? setSignUp(0) : setSignUp(1)
    }

    function getUser() {
      console.log("Getting User")
      fetch("/api/signin?" + new URLSearchParams({
        user : user,
        pwd : pwd
      }))
      .then(response => response.json())
      .then(data => { 
          if (data.success) {
            setDynamic([
              {type : "text", content : "Successfully signed in!"},
              {type : "button"}
            ])
          } else {
            setDynamic([
              {type : "text", content : data.error}
            ])
          }
        }
      )
    }

    function submit() {
      console.log("Creating signup")
        fetch("/api/signup?" + new URLSearchParams({
          user : user,
          pwd : pwd
        }))
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            setSignUp(2);
          } else {
            setDynamic([
              {type : "text", content : data.error}
            ])
          }
        })

    }

    function handler() {
      if (samPwd) {
        if (signup === 1) {
          submit()
        } 
      } else if (signup != 1) {
        getUser()
      }
    }
    
    return (
      <>
        {signup == 1 ? <>
          <h2>Sign Up Now!</h2>
          <p> DO NOT USE A PASSWORD THAT YOU USE FOR IMPORTANT THINGS</p>
        </> :
        <>
          <h2>Sign In!</h2>
          {signup == 2 ? <p>Lets try signing into your new account!</p> : <p>Welcome back!</p>}
        </>}
        <label>
            Username:
            <input onChange={(e) => setUserValue(e.target.value)} />
        </label>
        <label>
            Password:
            <input type="password" onChange={(e) => setPwdValue(e.target.value)} />
        </label>
        {signup === 1 && <label>
            Re-enter password:
            <input type="password" onChange={(e) => {
              if (pwd != e.target.value) {
                setSameValue(false)
              } else {
                setSameValue(true)
              }
            }} />
        </label>}
        
        {!samPwd && <p>Please make sure it is the same password</p>}
        <button style={{"marginRight" : 30}} onClick={handler}>Submit</button>
        <button onClick={switchMode}>{signup == 1 ? "Go to Login Page Instead" : "Go to Sign Up Page Instead"}</button>
        <DynamicContent items={dynamicItems} />
      </>
    )
  }
  