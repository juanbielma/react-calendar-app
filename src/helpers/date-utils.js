import * as dateFns from "date-fns";

import { monthNames } from "./constants";

/**
 * Gets the days of the month as an array
 * @param {*} daysInMonth 
 * @param {*} firstDayOfMonth 
 */
const getDaysOfMonthAsArray = (daysInMonth, firstDayOfMonth) => {
  const daysArray = Array.from(
    { length: daysInMonth },
    (ignore, index) => index + 1
  );
  let blankSpace = 0;
  while (blankSpace++ < firstDayOfMonth) {
    daysArray.unshift("");
  }
  let module7 = daysArray.length % 7;
  blankSpace = module7 == 0 ? module7 : 7 - module7;
  while (blankSpace--) {
    daysArray.push("");
  }
  return daysArray;
};

/**
 * Returns the year and the month of a date
 * @param {*} date 
 */
const getYearMonth = date => {
  const year = date.getFullYear();
  const month = date.getMonth();
  return { year, month };
};

/**
 * Builds a new Date with the input values
 * @param {*} year 
 * @param {*} month 
 * @param {*} day 
 */
const getNewDate = (year, month, day = 1) => new Date(year, month, day);

/**
 * Returns the Month name
 * @param {*} month 
 */
const getMonthByNumber = month => monthNames[month];

/**
 * Returns the year and month of the current date
 */
const getCurrentDateYM = () => {
  const date = new Date();
  return getYearMonth(date);
};

/**
 * Gets the current date with no hours
 */
const getCurrentDate = () => {
  const date = new Date();
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
};

/**
 * Return the today date formated
 */
const getFormatedTodayDate = () => {
  const date = new Date();
  return `${dateFns.format(date, "MMMM yyyy, dd")}`;
};

/**
 * Formats an date with the values given
 * @param {*} year 
 * @param {*} month 
 * @param {*} day 
 */
const getFormatedDate = (year, month, day) => {
  const date = getNewDate(year, month, day);
  return `${dateFns.format(date, "MMMM yyyy, dd")}`;
};

/**
 * Returns the suffix that the ordinal number will use
 */
const getTodaySuffix = () => {
  const suffix = { 1: "st", 2: "nd", 3: "rd", 0: "th" };

  const date = new Date();
  const lastnumber = date
    .getDate()
    .toString()
    .substr(1, 1);
  return suffix[lastnumber];
};

/**
 * gets the number of day of a month
 * @param {*} year 
 * @param {*} month 
 */
const daysInMonth = (year, month) =>
  dateFns.getDaysInMonth(getNewDate(year, month));

  /**
   * Returns the day of week for the first day of the month
   * @param {*} year 
   * @param {*} month 
   */
const firstDayAtMonth = (year, month) =>
  dateFns.getDay(dateFns.startOfMonth(getNewDate(year, month)));

  /**
   * Add n months to the month given
   * @param {*} year 
   * @param {*} month 
   * @param {*} amount 
   */
const addMonthYM = (year, month, amount = 1) => {
  const date = dateFns.addMonths(getNewDate(year, month), amount);
  return getYearMonth(date);
};

/**
 * Substract n months to the month given
 * @param {*} year 
 * @param {*} month 
 * @param {*} amount 
 */
const subMonthYM = (year, month, amount = 1) => {
  const date = dateFns.subMonths(getNewDate(year, month), amount);
  return getYearMonth(date);
};

/**
 * Check if the date given is today
 * @param {*} year 
 * @param {*} month 
 * @param {*} day 
 */
const checkIsToday = (year, month, day) =>
  dateFns.isToday(getNewDate(year, month, day));

  /**
   * Checks if the date given is before today
   * @param {*} year 
   * @param {*} month 
   * @param {*} day 
   */
const isBeforeToday = (year, month, day) =>
  dateFns.isBefore(getNewDate(year, month, day), getCurrentDate());

export {
  dateFns,
  getDaysOfMonthAsArray,
  getMonthByNumber,
  getCurrentDateYM,
  daysInMonth,
  firstDayAtMonth,
  addMonthYM,
  subMonthYM,
  checkIsToday,
  isBeforeToday,
  getFormatedTodayDate,
  getTodaySuffix,
  getFormatedDate
};
