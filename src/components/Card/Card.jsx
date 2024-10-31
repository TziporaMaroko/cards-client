import React, { useState } from "react";
import { FaTrash } from "react-icons/fa"; 
import { TiPin, TiPinOutline } from "react-icons/ti"; 
import style from "./Card.module.css";
import ColorPicker from "../ColorPicker/ColorPicker.jsx";
import Tooltip from "../Tooltip/Tooltip.jsx";

const colors = ["#FFA500", "#4CAF50", "#87CEFA", "#9370DB"];

const Card = ({ id, color, text, onDelete, onUpdate, onPinToggle, isPinned }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [cardText, setCardText] = useState(text);
  const [cardColor, setCardColor] = useState(color);
  const [showColorPicker, setShowColorPicker] = useState(false);

  const toggleEdit = () => setIsEditing(!isEditing);

  // Update text changes
  const handleTextChange = (e) => {
    const newText = e.target.value;
    setCardText(newText);
    onUpdate(id, { text: newText, color: cardColor });//updates the server
  };

  // Update color changes
  const changeColor = (newColor) => {
    setCardColor(newColor);
    setShowColorPicker(false);//disables the color picker
    onUpdate(id, { text: cardText, color: newColor });//updates the server
  };

  return (
    <div className={`${style.card} ${isPinned ? style.pinned : ""}`} style={{ backgroundColor: cardColor }}>
      {/* Pin icon positioned absolutely */}
      {isPinned ? (
        <TiPin 
          className={`${style.pinIcon}`} 
          color="white" // Use a neutral color for the pinned icon
          onClick={() => onPinToggle(id)} 
        />
      ) : (
        <TiPinOutline 
          className={`${style.pinIcon}`} 
          color="white" // Use a neutral color for the unpinned icon
          onClick={() => onPinToggle(id)} 
        />
      )}
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
          <Tooltip whenClick={toggleEdit}>
            <div className={style.text} onClick={toggleEdit}>
              {cardText}
            </div>
          </Tooltip>
        )}
      </div>
      <div className={style.bottom}>
        <div
          className={style.circle}
          onClick={() => setShowColorPicker(!showColorPicker)}
        />
        <FaTrash className={style.trashIcon} onClick={onDelete} />
        {showColorPicker && (
          <ColorPicker colors={colors} onSelectColor={changeColor} />
        )}
      </div>
    </div>
);

};

export default Card;
