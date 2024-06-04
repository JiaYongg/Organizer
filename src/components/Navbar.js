import React, {useEffect, useState} from "react"
import styles from "../css/NavBar.module.css"

export default function Navbar() {

    return (
        <section className={`${styles.navbar} poppins`}>
            <div className={styles.nav_component}>
                <img src="images/org_logo.svg" alt="" />
            </div>
            <div className={styles.nav_component}>
                <ul className={styles.links}>
                    <li><a href="/">Home</a></li>
                    <li><a href="/about">About Us</a></li>
                    <li><a href="/contact">Contact Us</a></li>
                    <li><a href="/signup">Sign Up</a></li>
                </ul>
            </div>
            <div className={styles.nav_component}>
                <button className={`${styles.login_button} poppins`}>Login</button>
            </div>
        </section>
    )

}