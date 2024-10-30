import React from "react";
import style from "./ColorPicker.module.css";

const ColorPicker = ({ colors, onSelectColor }) => {
    return (
        <div className={style.colorPicker}>
            {colors.map((colorOption) => (
                <div
                    key={colorOption}
                    className={style.colorOption}
                    style={{ backgroundColor: colorOption }}
                    onClick={() => onSelectColor(colorOption)}
                ></div>
            ))}
        </div>
    );
};

export default ColorPicker;
