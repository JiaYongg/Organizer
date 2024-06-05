import React  from "react"
import styles from "../css/Popup.module.css"

export default function Popup(props) {

    return (
        <div className={props.activePopup?`${styles.popup} ${styles.active}`:`${styles.popup}`}>
                <div className={styles.exit}>
                    <i className='bx bx-x' onClick={() => {props.setActivePopup((prev) => !prev)}}></i>
                </div>
            {props.children}
        </div>
    )
}
