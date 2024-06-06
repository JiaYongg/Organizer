import {useNavigate} from 'react-router-dom'
import styles from '../css/AppNavBar.module.css'

export default function AppNavBar() {
    const navigate = useNavigate();

    async function logout(){
        sessionStorage.removeItem("uid");
        navigate("/login");
    }

    return (
        <div className={styles.nav}>
        <div className={styles.img_div}>
            <img src="images/logo.png" alt="" />
        </div>
        <ul className={styles.links}>
            <li><a href="/main"><i className='bx bx-calendar'></i><p>Calendar</p></a></li>
            <li><a href="/journal"><i className='bx bx-book-bookmark' /><p>Journals</p></a></li>
        </ul>
        <div>
            <button onClick={() =>logout()}><i className='bx bx-log-out-circle' ></i><p>Log out</p></button>
        </div>
    </div>
    )
}
