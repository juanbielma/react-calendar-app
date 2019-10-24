import React from "react";
import classnames from "classnames";

import "./day.scss";

import { isBeforeToday } from "../../../../helpers/date-utils";
import { AST_PropAccess } from "terser";

const Day = ({
  day,
  className = "",
  disabled,
  events = [],
  onCreateEvent = () => {},
  isBeforeToday,
  onClickCheckAllEvents = () => {}
}) => {
  const containerCN = classnames(
    "day-of-week",
    { "day-of-week--disabled": disabled },
    className
  );

  return (
    <div className={containerCN} onDoubleClick={e => onCreateEvent(e, day)}>
      <div className="day">{day}</div>
      <EventContainer
        events={events}
        isBeforeToday={isBeforeToday}
        onCheckAllEvents={(e) => { onClickCheckAllEvents(e, day) }}
        showIcon = {true}
      ></EventContainer>
    </div>
  );
};

export const EventContainer = ({ events = [], isBeforeToday, ...props }) => {
  let eventsToRender = events;
  if (events.length > 4 && !props.displayAll) {
    eventsToRender = events.slice(0, 3);
  }

  return (
    <div className="events">
      {eventsToRender.map((event, index) => (
        <Event event={event} key={index + 100} isBeforeToday={isBeforeToday} {...props}></Event> 
      ))}
      {(events.length > 3 && !props.displayAll ) && (
        <div className="event event-plus" onClick={props.onCheckAllEvents}>
          {" "}
          +{events.length - eventsToRender.length} events{" "}
        </div>
      )}
    </div>
  );
};

export const Event = ({event, isBeforeToday, ...props}) => {
  return <div className="event">
  {props.showIcon && <i
    className={classnames(
      "fa",
      "fa-circle",
      "event__icon",
      isBeforeToday ? "event__icon--before" : "event__icon--after"
    )}
  ></i>}
  {event.title}{props.showDesc && <div className="event--description"> {event.description} </div>}
</div>
}

export default Day;
