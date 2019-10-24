import React from "react";

const EventContext = React.createContext({});

const EventState = props => {
  const [events, setEvents] = React.useState({});

  React.useEffect(() => {
    const storedEvents = JSON.parse(localStorage.getItem("events") || "{}");
    setEvents(storedEvents);
  }, []);

  const setSafeStateEvent = (node, value, cb) => {
    const nodeEvents = events[node] || [];

    const safeState = {
      ...events,
      [node]: [...nodeEvents, { ...value }]
    };

    localStorage.setItem("events", JSON.stringify(safeState));

    setEvents(safeState);
  };
  
  /**
   * Creates a new Event and stores to local storage
   */
  const createEvent = ({
    year,
    month,
    day,
    title,
    description,
    metadata = {}
  }) =>
    setSafeStateEvent(`${year}/${month}/${day}`, {
      title,
      description,
      metadata
    });

  /**
   * Gets the events for one day
   * @param {*} year
   * @param {*} month
   * @param {*} day
   */
  const getEvents = (year, month, day) =>
    events[`${year}/${month}/${day}`] || [];

  const eventApi = {
    events,
    createEvent: createEvent,
    getEvents: getEvents
  };

  return <EventContext.Provider {...props} value={eventApi} />;
};

const useEventState = () => {
  const context = React.useContext(EventContext);

  if (!context) throw new Error("useEventState must be inside the provider");
  return context;
};

export { useEventState, EventState };
