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

    useDocumentTitle("Ready to Organize?")
    
    async function signUp() {
        const signup = {
            username: username,
            email: email,
            password: password
        }

        console.log(signup)

        try {
            const response = await axios.post(API+'/user/signup', signup);
            console.log(response.data.uid)
            sessionStorage.setItem("uid", response.data.uid);
            navigate("/main")

        }catch(error) {
            console.error(error.message)
        }
    }

    return (
        <div className={styles.signup_bg}>
             <div className={styles.nav}>
                <div>
                    <img src="images/org_colored.png" alt="" />
                </div>
                <ul className={styles.links}>
                    <li><a href="/">Home</a></li>
                    <li><a href="/login">Login</a></li>
                </ul>
            
            </div>
            <div className={`${styles.signup_container} poppins`}>
            <div className={styles.signup}>
                <div className="top_text">
                    <h3>Hey You're new here</h3>
                    <h1>Ready to <span className="highlight-1">organize</span>?</h1>
                </div>

                <form >
                    <p>Sign up now!</p>
                    <div className={styles.row}>
                        <div className={styles.form_input}>
                            <label htmlFor="">Username</label>
                            <input type="text" value={username} onChange={(e)=> setUserName(e.target.value)}/>
                        </div>

                    </div>
                    <div className={styles.row}>
                        <div className={styles.form_input}>
                            <label htmlFor="">Email Address</label>
                            <input type="text"  value={email} onChange={(e)=> setEmail(e.target.value)}/>
                        </div>
                    </div>
                    <div className={styles.row}>
                        <div className={`${styles.form_input} ${styles.last_form_input}`}>
                            <label htmlFor="">Password</label>
                            <input type="password"  value={password} onChange={(e)=> setPassword(e.target.value)}/>
                        </div>
                    </div>
                    <div className = {styles.login}>
                        <p>Already a member? <a href="/login" className="highlight-1">Login here</a></p>
                    </div>

                </form>

                <button className={styles.join_us} onClick={() => {
                    signUp()
                }}> Join us now</button>


            </div>
        </div>

        </div>
        
    )

}