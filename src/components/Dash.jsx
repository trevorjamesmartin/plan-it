import React from "react";

import Calendar from "./Calendar"; // display

import { getEvent, getEvents, setEvent } from "./calendarIO"; // io

const Dash = ({ state, setState }) => {
  const updateSettings = upd => {
    setState({...state, ...upd })
  }
  return (
    <div className="div-dash">
      <br />
      <Calendar
        className="calendar-component"
        settings={state}
        updateSettings={updateSettings}
        functions={{ getEvents, getEvent, setEvent }}
      />
    </div>
  );
};

export default Dash;
