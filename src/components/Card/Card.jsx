import React, { useState } from "react";
import { FaTrash } from "react-icons/fa"; 
import style from "./Card.module.css";
import http from "../../service/http.js"

const colors = ["#FFA500", "#4CAF50", "#87CEFA", "#9370DB"]; // Array of colors for selection

const Card = ({ id, color, text, onDelete }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [cardText, setCardText] = useState(text);
    const [cardColor, setCardColor] = useState(color);
    const [showColorPicker, setShowColorPicker] = useState(false);

    // Toggle editing mode
    const toggleEdit = () => setIsEditing(!isEditing);

        // Handle text change
        const handleTextChange = async (e) => {
            const newText = e.target.value;
            setCardText(newText);
            try {
                await http.put(`/cards/${id}`, { text: newText, color: cardColor });
            } catch (error) {
                console.error('Failed to update card text:', error);
            }
        };
    
        // Change color
        const changeColor = async (newColor) => {
            setCardColor(newColor);
            setShowColorPicker(false);
            try {
                await http.put(`/cards/${id}`, { text: cardText, color: newColor });
            } catch (error) {
                console.error('Failed to update card color:', error);
            }
        };

    return (
        <div className={style.card} style={{ backgroundColor: cardColor }}>
            <div className={style.content}>
                {isEditing ? (
                    <input
                        className={style.textInput}
                        value={cardText}
                        onChange={handleTextChange}
                        onBlur={toggleEdit}
                        autoFocus
                    />
                ) : (
                    <span className={style.text} onClick={toggleEdit}>
                        {cardText}
                    </span>
                )}
            </div>
            <div className={style.bottom}>
                <div
                    className={style.circle}
                    onClick={() => setShowColorPicker(!showColorPicker)}
                ></div>
                
                <FaTrash className={style.trashIcon} onClick={onDelete} />

                {showColorPicker && (
                    <div className={style.colorPicker}>
                        {colors.map((colorOption) => (
                            <div
                                key={colorOption}
                                className={style.colorOption}
                                style={{ backgroundColor: colorOption }}
                                onClick={() => changeColor(colorOption)}
                            ></div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Card;
