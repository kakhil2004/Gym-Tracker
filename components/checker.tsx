'use client'
import { Metadata } from "next"
import { useState } from "react"


export default function Checker(props) {

    function sendData() {
        console.log(props.data)
    }

    return (
    <>
        <h3>{props.data.sp}</h3>
        <p>If you are NOT adding a new exercise, make SURE that the exercise names MATCH the names you used before. If you DO NOT do this, the visualizer will NOT work!</p>
        
        <table>
            <thead>
                <tr>
                    <th>Exercises</th>
                    <th>Sets</th>
                </tr>
            </thead>
            <tbody>
            
            {props.data.wos.map((woName) => 
                <tr>
                    <td>
                        {woName.name}
                    </td>
                    <td>
                        <ol type="1">
                            {woName.wo.map((set) =>
                                <li>
                                    {set.w + "  lbs for " + set.r + " reps"}
                                </li>
                            )}
                        </ol>
                    </td>
                </tr>
            )}
            </tbody>
        </table>
        <p>{"Comments: " + props.data.cm}</p>
        <p>{"Weight: " + props.data.we + " lbs"}</p>
        <button onClick={sendData}>Save Data!</button>
    </>
    )
}
