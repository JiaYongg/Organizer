import React, {useState, useEffect} from "react"
import useDocumentTitle from "../components/useDocumentTitle"
import { useNavigate } from "react-router-dom";
import styles from "../css/SignUp.module.css"
import axios from "axios";


export default function SignUpPage() {
    
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const navigate = useNavigate()

    useDocumentTitle("Sign Up")
    
    async function signUp() {
        const signup = {
            
        }
    }

    return (
        <main>
            <div className={styles.signup}>
                <div className="top_text">
                <h2>Hey You're new here</h2>
                <h1>Ready to <span>organize</span>?</h1>
                </div>

                <form action="">
                    <p>Sign up now!</p>
                    <div className={styles.row}>
                        <div className={styles.form_input}>
                            <label htmlFor="">First Name</label>
                            <input type="text" placeholder="Enter first name" />
                        </div>
                        <div className={styles.form_input}>
                            <label htmlFor="">Last Name</label>
                            <input type="text" placeholder="Enter last name" />
                        </div>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.form_input}>
                            <label htmlFor="">Email Address</label>
                            <input type="text" placeholder="Email" />
                        </div>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.form_input}>
                            <label htmlFor="">Password</label>
                            <input type="password" placeholder="Password" />
                        </div>
                    </div>
                </form>

                <button className={styles.join_us}> Join us now</button>


            </div>
        </main>
    )

}