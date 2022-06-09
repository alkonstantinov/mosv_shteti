import React from "react";

const TextControl = ({ name, title, placeHolder, value, setValue, mini, disabled, errors, ...others }) => {
    return (
        <div className={`form-item${disabled ? " disabled" : ""}`}>
            <label className={mini && "mini"} htmlFor={name}>{title}</label>
            <input
                type="text"
                id={name}
                name={name}
                placeholder={placeHolder}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                {...others}
            />
            {errors && errors.isWrong && <label className="mini red">{errors.message}</label>}
        </div>
    );
};

export default TextControl;
