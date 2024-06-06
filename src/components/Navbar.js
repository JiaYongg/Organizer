import React, {useEffect, useState} from "react"
import styles from "../css/NavBar.module.css"
import { useNavigate } from "react-router-dom"

export default function Navbar() {

    const navigate = useNavigate()

    return (
        <section className={`${styles.navbar} poppins`}>
            <div className={styles.nav_component}>
                <img onClick={() => navigate('/')} src="images/org_logo.svg" alt="" />
            </div>
            <div className={styles.nav_component}>
                {/* <ul className={styles.links} style={{display: "flex", alignItems:"center", justifyContent:'space-between'}}>
                    <li><a href="/">Home</a></li>
                    <li><a href="/about">About Us</a></li>
                    <li><a href="/contact">Contact Us</a></li>
                    <li><a href="/signup">Sign Up</a></li>
                </ul> */}
            </div>
            <div className={styles.nav_component}>
                <button onClick={() => navigate('/login')} className={`${styles.login_button} poppins`}>Login</button>
            </div>
        </section>
    )

}