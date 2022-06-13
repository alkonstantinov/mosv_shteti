import React from "react";
import Calendar from "./Calendar";

const DateControl = ({ title, name, value, setValue, locale, min, errors, ...others }) => {
    return (
        <div className="form-item">
            {title && <label htmlFor={name}>{title}</label>}
            <Calendar
                id={name}
                value={value}
                setValue={setValue}
                locale={locale}
                min={min}
                error={errors && errors.isWrong}
                {...others}
            />
            {errors && errors.isWrong && <label className="mini red">{errors.message}</label>}
        </div>
    );
};

export default DateControl;
