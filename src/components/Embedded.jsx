import React from "react";
import Calendar from './Calendar';
import {getEvents, getEvent, setEvent} from './calendarIO';
import "./Calendar/style.css";

export default function() {
  return <Calendar className="calendar-component" state={{language: "en"}} functions={{ getEvents, getEvent, setEvent }} />
}
