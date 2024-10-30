import React from "react";
import { FaPencilAlt } from "react-icons/fa";
import styles from "./Tooltip.module.css";

const Tooltip = ({ children, whenClick }) => (
    <div className={styles.tooltipContainer}>
        {children}
        <FaPencilAlt className={styles.tooltipIcon} onClick={whenClick}/>
    </div>
);

export default Tooltip;
