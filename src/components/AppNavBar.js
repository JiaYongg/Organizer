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
        <div>Header</div>
        <div>
            <button onClick={() =>logout()}>Logout</button>
        </div>
    </div>
    )
}
