import React from "react";
import Calendar from "./components/calendar/calendar";

import { EventState } from "./states/event-state";

const App = props => <EventState><Calendar/></EventState>;

export default App;
