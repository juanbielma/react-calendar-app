import CalendarHeader from "./calendar-header";
import { cleanup } from "@testing-library/react";

afterEach(cleanup);

describe("Calendar Header Component", () => {
  it("TodayMonthClick", () => {
    const spy = sinon.spy();

    const month = 1;
    const year = 2019;

    const calendarHeader = shallow(
      <CalendarHeader
        month={month}
        year={year}
        goToday={spy}
        nextMonth={() => {}}
        prevMonth={() => {}}
      ></CalendarHeader>
    );

    const todayBtn = calendarHeader.find({"data-testid": "todayBtn"});

    todayBtn.first().simulate("click");

    expect(spy.calledOnce).toBeTruthy();

  });

  it("PrevMonthClick", () => {
    const spy = sinon.spy();

    const month = 1;
    const year = 2019;

    const calendarHeader = shallow(
      <CalendarHeader
        month={month}
        year={year}
        goToday={() => {}}
        nextMonth={() => {}}
        prevMonth={spy}
      ></CalendarHeader>
    );

    const prevMonthBtn = calendarHeader.find({"data-testid": "prevMonthBtn"});

    prevMonthBtn.first().simulate("click");

    expect(spy.calledOnce).toBeTruthy();

  });

  it("NextMonthClick", () => {
    const spy = sinon.spy();

    const month = 1;
    const year = 2019;

    const calendarHeader = shallow(
      <CalendarHeader
        month={month}
        year={year}
        goToday={() => {}}
        nextMonth={spy}
        prevMonth={() => {}}
      ></CalendarHeader>
    );

    const nextMonthBtn = calendarHeader.find({"data-testid": "nextMonthBtn"});

    nextMonthBtn.first().simulate("click");

    expect(spy.calledOnce).toBeTruthy();

  });
});