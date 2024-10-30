import React, { useState } from "react";
import { FaTrash } from "react-icons/fa"; 
import style from "./Card.module.css";
import ColorPicker from "../ColorPicker/ColorPicker.jsx";
import Tooltip from "../Tooltip/Tooltip.jsx";

const colors = ["#FFA500", "#4CAF50", "#87CEFA", "#9370DB"];

const Card = ({ id, color, text, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [cardText, setCardText] = useState(text);
  const [cardColor, setCardColor] = useState(color);
  const [showColorPicker, setShowColorPicker] = useState(false);

  const toggleEdit = () => setIsEditing(!isEditing);

  const handleTextChange = (e) => {
    const newText = e.target.value;
    setCardText(newText);
    onUpdate(id, { text: newText, color: cardColor });
  };

  const changeColor = (newColor) => {
    setCardColor(newColor);
    setShowColorPicker(false);
    onUpdate(id, { text: cardText, color: newColor });
  };

  return (
    <div className={style.card} style={{ backgroundColor: cardColor }}>
      <div className={style.content}>
        {isEditing ? (
          <textarea
            className={style.textArea}
            value={cardText}
            onChange={handleTextChange}
            onBlur={toggleEdit}
            autoFocus
            rows={2}
          />
        ) : (
          <Tooltip>
            <span className={style.text} onClick={toggleEdit}>
              {cardText}
            </span>
          </Tooltip>
        )}
      </div>
      <div className={style.bottom}>
        <div
          className={style.circle}
          onClick={() => setShowColorPicker(!showColorPicker)}
        ></div>
        
        <FaTrash className={style.trashIcon} onClick={onDelete} />

        {showColorPicker && (
          <ColorPicker colors={colors} onSelectColor={changeColor} />
        )}
      </div>
    </div>
  );
};

export default Card;
