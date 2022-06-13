import React from "react";

const SelectControl = ({ name, title, listObject, placeHolder, value, setValue, disabled, errors, ...others  }) => {
    const keys = Object.keys(listObject);
    const menu = [
        { value: 0, label: placeHolder },
        ...keys.map((key, idx) => {
            return { value: idx + 1, label: listObject[key] };
        }),
    ];
    return (
        <div className={`form-item${disabled ? " disabled" : ""}`}>
            <label htmlFor={name}>{title}</label>
            <div className="select">
                <select
                    id={name}
                    name={name}
                    disabled={disabled}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    {...others}
                >
                    {menu.length > 1 &&
                        menu.map((el) => (
                            <option key={el.value} value={el.value}>
                                {el.label}
                            </option>
                        ))}
                </select>
            </div>
            {errors && errors.isWrong && <label className="mini red">{errors.message}</label>}
        </div>
    );
};

export default SelectControl;
