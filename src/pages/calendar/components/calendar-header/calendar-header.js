import React from "react";
import PropTypes from "prop-types";

import "./calendar-header.scss";

import {
  getMonthByNumber,
  getFormatedTodayDate,
  getTodaySuffix
} from "../../../../helpers/date-utils";

import { Button } from "../../../../components";

const CalendarHeader = ({
  month,
  year,
  goToday,
  nextMonth,
  prevMonth,
  icon = "",
  ...others
}) => {
  return (
    <div className="calendar-header">
      <div className="flex100p">
        <Button data-testid="todayBtn" key="today" onClick={goToday} classNames={["primary"]}>
          Today
        </Button>
        <Button data-testid="prevMonthBtn"
          key="prev-month"
          onClick={prevMonth}
          classNames={["primary-text", "icon"]}
        >
          <i className="fa fa-chevron-left"></i>
        </Button>
        <Button
          data-testid="nextMonthBtn"
          key="next-month"
          onClick={nextMonth}
          classNames={["primary-text", "icon"]}
        >
          <i className="fa fa-chevron-right"></i>
        </Button>
        <span className="month-title">{`${getMonthByNumber(
          month
        )} - ${year}`}</span>
      </div>
      <div
        className="flex flex30p justify-text-end today-action"
        onClick={goToday}
      >
        <img src={icon} />
        <span className="today-title">
          {getFormatedTodayDate()}
          <sup className="suffix">{getTodaySuffix()}</sup>
        </span>
      </div>
    </div>
  );
};

CalendarHeader.propTypes = {
  month: PropTypes.number,
  year: PropTypes.number
};

CalendarHeader.defaultProps = {
  month: 10,
  year: 2019
};

export default CalendarHeader;
