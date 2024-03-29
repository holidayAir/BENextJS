
'use client'

import React from "react";
import DatePicker, { DateObject } from "react-multi-date-picker";

const DateSearch = ({name, dates, isSingle=false ,onChange, minDate, maxDate}) => {

  const datePickerProps = {
    value: dates,
    multiple: false,
    range: !isSingle,
    single:isSingle,
    rangeHover: false,
    format:"MMMM DD YYYY",
    locale: "en",
    mapDays: null,
    onChange: (newDates) => {
      const fakeEvent = { target: { name: name, value: newDates.length > 1 ? new Date(newDates[0]).toISOString():new Date(newDates).toISOString() } };
      onChange(fakeEvent);
    },
    className: "",
    zIndex: 100,
    highlightToday: true,
    arrow: true,
    arrowStyle: {},
    arrowClassName: "",
    inputClass: "custom_input-picker",
    containerClassName:"form-input custom_container-picker",
    name: name,
    id: name,
    title: name,
    placeholder: "Select Date",
    scrollSensitive: true,
    calendarPosition: "auto",
    editable: true,
    minDate:(minDate ? minDate :new DateObject()),
    maxDate:(maxDate ? maxDate :new DateObject().add(6, "month")),
    numberOfMonths:1,
    offsetY:10,
  };

  return (
    <div className="text-15 text-light-1 ls-2 lh-16 w-100 custom_dual_datepicker">
      <DatePicker
        {...datePickerProps}
      />
    </div>
  );
};

export default DateSearch;
