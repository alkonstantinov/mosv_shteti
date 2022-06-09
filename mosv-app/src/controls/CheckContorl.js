import React from "react";

const CheckControl = ({ name, label, value, setValue, disabled, ...others }) => {
    return (
        <div className="form-check">
            <input
                className="form-check-input"
                type="checkbox"
                id={name}
                checked={value}
                onChange={(e) => setValue(e.target.checked)}
                disabled={disabled}
                {...others}
            />
            <label className="form-check-label" htmlFor={name}>
                {label}
            </label>
        </div>
    );
};

export default CheckControl;
