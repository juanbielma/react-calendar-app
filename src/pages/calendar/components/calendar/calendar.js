import React from "react";

//Styles
import "./calendar.scss";

// Components
import Day, { EventContainer } from "../day/day";
import CalendarHeader from "../calendar-header/calendar-header";
import {
  Grid,
  Form,
  FormField,
  Button,
  Frame,
  Spinner,
  Modal
} from "../../../../components/index";

// Constants
import { DAYS_OF_WEEK } from "../../../../helpers/constants";

// Helpers
import {
  getDaysOfMonthAsArray,
  checkIsToday,
  isBeforeToday,
  getFormatedDate
} from "../../../../helpers/date-utils";

//States
import useCalendarState from "../../states/calendar-state";
import { useEventState } from "../../states/event-state";
import useInput from "../../../../CustomHooks/useInput";

import { getWeatherByCity } from "../../../../api/weather-api";

const Calendar = () => {
  const [showEventForm, setShowEventForm] = React.useState(false);
  const [weather, setWeather] = React.useState("");
  const [loading, setLoading] = React.useState(true);
  const [showEventsModal, setShowEventsModal] = React.useState(false);

  const { daysOfMonth, firstDayMonth, ...calendar } = useCalendarState();

  const eventState = useEventState();

  const { value: eventValue, reset: eventReset, bind: eventBind } = useInput(
    ""
  );

  const {
    value: descriptionValue,
    reset: descriptionReset,
    bind: descriptionBind
  } = useInput("");

  const selectedDay = React.useRef(0);

  React.useEffect(() => {
    getWeatherByCity().then(data => {
      setWeather({
        icon: `https://openweathermap.org/img/w/${data.weather[0].icon}.png`
      });
    });

    setLoading(false);
  }, []);

  /**
   * Submits the form to Add a new event
   * @param {*} evt 
   */
  const handleSubmit = evt => {
    eventState.createEvent({
      year: calendar.year,
      month: calendar.month,
      day: selectedDay.current,
      title: eventValue,
      description: descriptionValue
    });

    eventReset();
    descriptionReset();
    selectedDay.current = 0;
    setShowEventForm(false);
  };

  /**
   * Opens the right frame where is the form fot the calendar
   * @param {*} evt 
   * @param {*} day 
   */
  const handleCreateEvent = (evt, day) => {
    selectedDay.current = day;
    setShowEventForm(!showEventForm);
  };

  /**
   * Opens a modal to review the events that were added to a day
   * @param {*} e 
   * @param {number} day 
   */
  const handleClickCheckAllEvents = (e, day) => {
    console.log(day);
    selectedDay.current = day;
    setShowEventsModal(true);
  };

  const handleCancel = () => {
    eventReset();
    descriptionReset();
    selectedDay.current = 0;
    setShowEventForm(false);
  };

  const handleCloseModal = () => {
    selectedDay.current = 0;
    setShowEventsModal(false);
  };

  if (loading) return <Spinner />;

  return (
    <div>
      <div className="container">
        <div className="calendar CalendarApp">
          <CalendarHeader {...calendar} icon={weather.icon}></CalendarHeader>
          <div className="calendar--grid-container">
            <Grid className="days-of-week" columns={DAYS_OF_WEEK.length}>
              {DAYS_OF_WEEK.map(day => (
                <Day key={day} day={day}></Day>
              ))}
            </Grid>
            <Grid
              className="days-of-month"
              columns={DAYS_OF_WEEK.length}
              rows={daysOfMonth.length / DAYS_OF_WEEK.length}
            >
              {getDaysOfMonthAsArray(daysOfMonth, firstDayMonth).map(
                (day, index) => (
                  <Day
                    key={index}
                    day={day}
                    disabled={day === ""}
                    className={
                      checkIsToday(calendar.year, calendar.month, day)
                        ? "day-of-week--is-today"
                        : ""
                    }
                    onCreateEvent={handleCreateEvent}
                    events={eventState.getEvents(
                      calendar.year,
                      calendar.month,
                      day
                    )}
                    isBeforeToday={isBeforeToday(
                      calendar.year,
                      calendar.month,
                      day
                    )}
                    onClickCheckAllEvents={handleClickCheckAllEvents}
                  ></Day>
                )
              )}
            </Grid>
          </div>
        </div>
      </div>
      <Frame show={showEventForm} direction="right">
        <Frame.Header>
          <Button
            type="buttom"
            key="close"
            onClick={handleCancel}
            classNames={["icon", "primary-text--outlined"]}
          >
            <i className="fa fa-times fa-2x"></i>
          </Button>
          <h1> Create new event </h1>
        </Frame.Header>
        <Frame.Dialog>
          <Form onSubmit={handleSubmit}>
            <FormField
              id="txtEvent"
              labelText="Event Name"
              placeholder="Event Name"
              type="text"
              binding={eventBind}
            ></FormField>
            <FormField
              id="txtEventDescription"
              labelText="Event Description"
              placeholder="Event Description"
              type="text"
              binding={descriptionBind}
            ></FormField>
            <div className="justify-text-end">
              <Button
                type="buttom"
                key="cancel"
                onClick={handleCancel}
                classNames={["primary-outlined"]}
              >
                Cancel
              </Button>
              <Button type="submit" key="submit" classNames={["primary"]}>
                Add event
              </Button>
            </div>
          </Form>
        </Frame.Dialog>
      </Frame>
      <Modal show={showEventsModal}>
        <Modal.Header>
          <Button
            type="buttom"
            key="close"
            onClick={handleCloseModal}
            classNames={["icon", "primary-text--outlined"]}
          >
            <i className="fa fa-times fa-2x"></i>
          </Button>
          <h1> Events for {getFormatedDate(calendar.year, calendar.month, selectedDay.current)} </h1>
        </Modal.Header>
        <Modal.Body>
          <EventContainer
            events={eventState.getEvents(calendar.year, calendar.month, selectedDay.current)}
            isBeforeToday={isBeforeToday(
                      calendar.year,
                      calendar.month,
                      selectedDay.current
                    )}
            displayAll={true}
            showDesc={true}
          ></EventContainer>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Calendar;
