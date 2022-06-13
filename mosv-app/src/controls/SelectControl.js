import React from "react";

const SelectControl = ({
    name,
    title,
    listObject,
    placeHolder,
    value,
    setValue,
    disabled,
    errors,
    oneRow,
    ...others
}) => {
    const keys = [
        ...Object.keys(listObject).map((key) => {
            return { value: key, label: listObject[key] };
        }),
    ];
    const menu = placeHolder ? [{ value: 0, label: placeHolder }, ...keys] : [...keys];

    return (
        <div className={`form-item${disabled ? " disabled" : ""} ${oneRow ? "roww" : ""}`}>
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
