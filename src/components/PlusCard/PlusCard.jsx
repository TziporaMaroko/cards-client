import React from "react";
import { FaPlus } from "react-icons/fa"; 
import style from "./PlusCard.module.css";

const PlusCard = ({ onCardAdded }) => {
    const handleAddCard = () => {
        const defaultText = "New Card"; 
        const defaultColor = "#FFA500"; 

        // Call the provided onCardAdded function with default values
        if (onCardAdded) {
            onCardAdded({ text: defaultText, color: defaultColor });
        }
    };

    return (
        <div className={style.PlusCard} onClick={handleAddCard}>
            <FaPlus size={30} /> 
        </div>
    );
}

export default PlusCard;
