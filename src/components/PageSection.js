import React from "react";
import styles from "../css/PageSection.module.css"

export default function PageSection(props) {
    return (
        <div className={styles.content} >
            {props.children}
        </div>
    )
}