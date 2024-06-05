import React, {useState} from "react"
import { useNavigate } from "react-router-dom";
import axios from "axios"
import {API} from "../constants"

import styles from "../css/SignUp.module.css"


export default function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    
    async function login(){
        const response = await axios.post(API + "/user/login", {
            username: username,
            password: password
        })
        const data = response.data;
        console.log(data);
        if (!data){
            alert("Invalid username or password");
            return;
        }
        else{
            sessionStorage.setItem("uid", data.user_id);
            navigate("/main");
        }
    }

    return (
    <main className={styles.login_bg}>
    <div className={styles.nav}>
       <div>
           <img src="images/org_colored.png" alt="" />
       </div>
       <ul className={styles.links}>
           <li><a href="/">Home</a></li>
           <li><a href="/signup">Sign up</a></li>
       </ul>
   
   </div>
   <div className={`${styles.signup_container} poppins`}>
   <div className={styles.signup}>
       <div className="top_text">
           <h3>Welcome Back</h3>
           <h1>Let's get<span className="highlight-1"> organized</span></h1>
       </div>

       <form >
           <p>New here? <span className="highlight-1">Get Organized now!</span></p>
           <div className={styles.row}>
               <div className={styles.form_input}>
                   <label htmlFor="">Username</label>
                   <input type="text" value={username} onChange={(e)=> setUsername(e.target.value)}/>
               </div>

           </div>
           <div className={styles.row}>
               <div className={`${styles.form_input} ${styles.last_form_input}`}>
                   <label htmlFor="">Password</label>
                   <input type="password"  value={password} onChange={(e)=> setPassword(e.target.value)}/>
               </div>
           </div>
           <div className = {styles.login}>
               <p className={styles.forgot}>Forgot Password</p>
           </div>

       </form>

            <button className={styles.join_us} onClick={() => {
                login()
            }}> Join us now</button>


        </div>
        </div>

        </main>


    )

}