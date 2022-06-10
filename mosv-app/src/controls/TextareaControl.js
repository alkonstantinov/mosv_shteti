import React from "react";

const TextareaControl = ({ name, title, placeHolder, value, setValue, mini, disabled, errors, rows, ...others }) => {
    return (
        <div className={`form-item${disabled ? " disabled" : ""}`}>
            {title && <label className={mini && "mini"} htmlFor={name}>{title}</label>}
            <textarea
                id={name}
                name={name}
                placeholder={placeHolder}
                rows={rows || "3"}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                {...others}
            />
            {errors && errors.isWrong && <label className="mini red">{errors.message}</label>}
        </div>
    );
};

export default TextareaControl;
