import React from "react";
import Calendar from './Calendar';
import {getEvents, getEvent, setEvent} from './calendarIO';
import "./Calendar/style.css";

export default function({settings}) {
  return (
    <div className="calendar-frame">
      <Calendar className="calendar-component" functions={{ getEvents, getEvent, setEvent }} />
    </div>
  )
}
