import { Inter } from 'next/font/google'
import Link from 'next/link'
const inter = Inter({ subsets: ['latin'] })
import styles from './Layout.module.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://unpkg.com/sakura.css/css/sakura.css" type="text/css"></link>
      </head>
      
      <body className={inter.className}>
        <nav className={styles.nav}>
          <a href="/">Gym Tracker</a>
          <Link href="/account" >Account</Link>
          <Link href="/log" >Log</Link>
          <Link href="/import" >Import</Link>
          <Link href="/about" >Progress</Link>
          <Link href="/bout" >Graphs</Link>
        </nav>
        {children}
        </body>
    </html>
  )
}
