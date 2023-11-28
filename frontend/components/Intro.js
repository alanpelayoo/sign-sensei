import React from 'react'
import styles from './Intro.module.css';
import Button from 'react-bootstrap/Button';
import Link from 'next/link';

function Intro() {
  return (
    <div className={styles.container}>
        <div className={styles.message}>
            <p>Yo, what's poppin'! You've stumbled upon the coolest ASL assistant around - Sign Sensei, at your service. Flash those fingers and we'll get your signing skills on point, stat. Let's do this!</p>
            <p>Ready to see Sign Sensai in action? Check out the demo below to get a taste of what we're cooking up. Trust me, it's lit! 🔥</p>
        </div>
        
        <div className={styles.videoC}>
            <img src={"seiIntro.webp"} alt="Logo" className={styles.Image} />
        </div>
        <div className={styles.buttons}>
            <Link href="/chatScreen"><Button variant="outline-dark">Chat</Button>{' '}</Link>
            <Link href="/demo"><Button variant="outline-primary">Demo</Button>{' '}</Link>
        </div>
        
    </div>
  )
}

export default Intro