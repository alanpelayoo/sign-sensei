import React from 'react';
import styles from './Header.module.css'; // Importing custom styles for the Header
import Link from 'next/link';

function Header() {
  return (
    <header className={styles.header}>
      <p className='my-0 mx-3 fs-4'>
        <Link href="/" className={styles.link}>home.</Link>  
      </p>
      <img src="/logo.png" alt="Logo" className={styles.headerImage} />
      
      <p className='m-0 mx-3 fs-4'>
        <Link href="/about" className={styles.link}>about.</Link>  
      </p>
    </header>
  )
}

export default Header;

