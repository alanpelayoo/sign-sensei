import React from 'react'
import styles from './Footer.module.css'; // Importing custom styles for the Header
import Link from 'next/link';

// Import the FontAwesomeIcon component
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// import the icons you need
import { faXTwitter, faGithub } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.div1}>
        <img src="/logo2.png" alt="Logo" className={styles.footerImage} />
        <p className={styles.footerText}>©2023 Sei by apcodes.</p>
      </div>
      <div className={styles.div2}>
        <Link href="https://twitter.com/realapcodes" target="_blank">
          <FontAwesomeIcon className={styles.footerIcon} icon={faXTwitter} />
        </Link>
        <Link href="https://github.com/alanpelayoo" target="_blank">
          <FontAwesomeIcon className={styles.footerIcon} icon={faGithub} />
        </Link>
        <Link href="mailto:apcodes@.com" target="_blank">
          <FontAwesomeIcon className={styles.footerIcon} icon={faEnvelope} /> 
        </Link>
      </div>
    </footer>
  )
}

export default Footer
{/* Footer
    <FontAwesomeIcon icon={faXTwitter} />
    <FontAwesomeIcon icon={faGithub} />
    <FontAwesomeIcon icon={faEnvelope} /> */}
    // <img src="/logo2.png" alt="Logo" className={styles.footerImage} />