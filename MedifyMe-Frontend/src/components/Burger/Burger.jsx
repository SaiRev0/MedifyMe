import React, { useState } from 'react';
import styles from './Burger.module.css'

const Burger = () => {
    const [open, setOpen] = useState(false)
    
    return (
      <>
        <div className={open ? styles.show : styles.burger} onClick={() => setOpen(!open)}>
          <div/>
          <div/>
          <div/>
        </div>
        <ul className={open ? styles.ul : styles.open}>
        <li>Health History</li>
        <li>Prescriptions</li>
        <li>Test & Reports</li>
        <li>Appointment</li>
        <li>Sign In</li>
      </ul>
      </>
    )
  }
  
  export default Burger;