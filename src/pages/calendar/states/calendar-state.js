import React from "react";
import PropTypes from "prop-types";

import {
  getCurrentDateYM,
  daysInMonth,
  firstDayAtMonth,
  addMonthYM,
  subMonthYM
} from "../../../helpers/date-utils";

 const useCalendar = () => {
  const { year, month } = React.useMemo(() => getCurrentDateYM(), []);

  const [calendar, setCalendar] = React.useState({
    year,
    month,
    daysOfMonth: daysInMonth(year, month),
    firstDayMonth: firstDayAtMonth(year, month)
  });

  const nextMonth = () => {
    const {year, month } = addMonthYM(calendar.year, calendar.month);

    setCalendar({
        year,
        month,
        daysOfMonth: daysInMonth(year, month),
        firstDayMonth: firstDayAtMonth(year, month)
    })
  };

  const prevMonth = () => {
    const {year, month } = subMonthYM(calendar.year, calendar.month);

    setCalendar({
        year,
        month,
        daysOfMonth: daysInMonth(year, month),
        firstDayMonth: firstDayAtMonth(year, month)
    })
    
  };

  const goToday = () => {
    const {year, month} = getCurrentDateYM();

    setCalendar({
        year,
        month,
        daysOfMonth: daysInMonth(year, month),
        firstDayMonth: firstDayAtMonth(year, month)
    })
    
  };

  const getCalendarApi = () => {
    return {
      ...calendar,
      prevMonth: prevMonth,
      nextMonth: nextMonth,
      goToday: goToday
    };
  };

  return getCalendarApi();
}

export default useCalendar;
