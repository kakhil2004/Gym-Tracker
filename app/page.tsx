'use client'
import { Metadata } from "next"
import { useState } from "react"

export const metadata: Metadata = {
  title: 'Gym Tracker - 1.0',
  description: 'This is a gym tracker created by Akhil Kothapalli',
}

export default function Home() {
  return (
    <main>
      <h1>Welcome to the Gym Tracker!</h1>
      <h5>Disclaimer</h5>
      <p>This is still needs a lot of work, so <b>PLEASE</b> do not use sensitive information. I am not liable for any data breachs</p>
      <h5>Quick Start</h5>
      <ul>
        <li>Click Account at the top to sign up</li>
        <li>Use the log tab to record your progress</li>
        <li>Graphs show you a visualization of your progress</li>
      </ul>
      <h5>Other info</h5>
      <ul>
        <li>Your data is stored in the cloud</li>
        <li>Do not put important information anywhere on this app</li>
      </ul>

      <a href="/about"><h6>Click me to learn how I made this</h6></a>
    </main>
  )
}
