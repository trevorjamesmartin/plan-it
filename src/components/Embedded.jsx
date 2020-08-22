import React from "react";
import Calendar from './Calendar';
import {getEvents, getEvent, setEvent} from './calendarIO';
import "./Calendar/style.css";

export default function({settings}) {
  return <Calendar className="calendar-component" functions={{ getEvents, getEvent, setEvent }} />
}
