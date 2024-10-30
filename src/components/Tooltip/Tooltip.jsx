import React from "react";
import { FaPencilAlt } from "react-icons/fa";
import styles from "./Tooltip.module.css";

const Tooltip = ({ children, text }) => (
    <div className={styles.tooltipContainer}>
        {children}
        <FaPencilAlt className={styles.tooltipIcon} />
    </div>
);

export default Tooltip;
