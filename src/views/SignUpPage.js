import React, {useState, useEffect} from "react"
import useDocumentTitle from "../components/useDocumentTitle"
import { useNavigate } from "react-router-dom";
import styles from "../css/SignUp.module.css"
import axios from "axios";
import { API } from "../constants";

export default function SignUpPage() {
    
    const [email, setEmail] = useState("");
    const [username, setUserName] = useState("")
    const [password, setPassword] = useState("");

    const navigate = useNavigate()

    useDocumentTitle("Sign Up")
    
    async function signUp() {
        const signup = {
            username: username,
            email: email,
            password: password
        }

        console.log(signup)

        try {
            await axios.post(API+'/user/signup', signup);
            navigate("/")

        }catch(error) {
            console.error(error.message)
        }
    }

    return (
        <main>
            <div className={styles.signup}>
                <div className="top_text">
                <h2>Hey You're new here</h2>
                <h1>Ready to <span className="hightlight-1">organize</span>?</h1>
                </div>

                <form >
                    <p>Sign up now!</p>
                    <div className={styles.row}>
                        <div className={styles.form_input}>
                            <label htmlFor="">Username</label>
                            <input type="text" placeholder="Enter first name" value={username} onChange={(e)=> setUserName(e.target.value)}/>
                        </div>

                    </div>
                    <div className={styles.row}>
                        <div className={styles.form_input}>
                            <label htmlFor="">Email Address</label>
                            <input type="text" placeholder="Email" value={email} onChange={(e)=> setEmail(e.target.value)}/>
                        </div>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.form_input}>
                            <label htmlFor="">Password</label>
                            <input type="password" placeholder="Password" value={password} onChange={(e)=> setPassword(e.target.value)}/>
                        </div>
                    </div>
                </form>

                <button className={styles.join_us} onClick={() => {
                    signUp()
                }}> Join us now</button>


            </div>
        </main>
    )

}