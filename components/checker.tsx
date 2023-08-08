'use client'
import { Metadata } from "next"
import { useState } from "react"


export default function Checker(props) {
  return (
    <>
        <h3>{props.data.sp}</h3>
        <table>
            <thead>
                <tr>
                    <th>Workout Name</th>
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
                                    {set.w + " lbs for " + set.r + " reps"}
                                </li>
                            )}
                        </ol>
                    </td>
                </tr>
            )}
            </tbody>
        </table>
        <p>{"Comments: " + props.data.cm}</p>
    </>
  )
}
