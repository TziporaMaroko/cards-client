import React from "react";
import { FaPlus } from "react-icons/fa"; 
import style from "./PlusCard.module.css";
import http from "../../service/http.js";

const PlusCard = ({ onCardAdded }) => {
    const handleAddCard = async () => {
        const defaultText = "New Card"; 
        const defaultColor = "#FFA500"; 

        try {
            const response = await http.post('/cards', {
                text: defaultText,
                color: defaultColor,
            });

            if (onCardAdded) {
                onCardAdded(response.data); // Call a function to update the UI, if provided
            }
        } catch (error) {
            console.error('Failed to add card:', error); 
        }
    };

    return (
        <div className={style.PlusCard} onClick={handleAddCard}>
            <FaPlus size={30} /> 
        </div>
    );
}

export default PlusCard;
