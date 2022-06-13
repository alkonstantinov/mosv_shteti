import React from "react";
import bg from "date-fns/locale/bg";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Calendar = ({ value, setValue, locale, min, error, ...others }) => {
    registerLocale("bg", bg);
    return (
        <DatePicker
            selected={value}
            onChange={(date) => setValue(date)}
            closeOnScroll={true}
            dateFormat="dd/MM/yyyy"
            locale={locale}
            minDate={min || new Date("1900/01/01")}
            maxDate={new Date("2200/01/01")}
            showDisabledMonthNavigation
            showWeekNumbers
            timeClassName={error && "text-error"}
            {...others}
        />
    );
};

export default Calendar;
