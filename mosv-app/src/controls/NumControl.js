import React from "react";

const NumControl  = ({ name, title, placeHolder, value, setValue, mini, disabled, errors, ...others }) => {
    const setValueHandler = (e) => {
        let str = e.target.value;
        
        if (str !== "0") {
            let leadingChar = str[0];
            while (leadingChar === "0") {
                str = str.slice(1);
                leadingChar = str[0];
            }
        }
        if (str !== "") {
            str = parseFloat(str).toFixed(2);
            setValue(Number(str).toString());
        } else {
            setValue("");
        }
    }

    return (
        <div className={`form-item${disabled ? " disabled" : ""}`}>
            <label className={mini && "mini"} htmlFor={name}>{title}</label>
            <input
                type="number"
                step="0.01"
                id={name}
                name={name}
                placeholder={placeHolder}
                value={value}
                onChange={setValueHandler}
                {...others}
            />
            {errors && errors.isWrong && <label className="mini red">{errors.message}</label>}
        </div>
    );
};

export default NumControl ;
