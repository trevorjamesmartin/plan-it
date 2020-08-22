import React from 'react';
import Event from "./Event";
import {MONTH_NAMES} from "../util/config"

const EventList = ({state, settings, evState, handlers}) => {
  const { handleMouseEnter, handleMouseLeave, handleEventClick} = handlers;
  return (
    <>
      <p>
        list of events for {state.selectMonth}-{state.selectDay}-
        {state.year}...
      </p>
      <ul>
        {state.events.map((ev, idx) => {
          const key = JSON.stringify({
            yyyy: state.year,
            mm: MONTH_NAMES[settings.language].indexOf(state.selectMonth) + 1,
            dd: state.selectDay,
            start: ev.start.datetime
          })
          return (
            <Event
              ev={ev}
              key={idx}
              name={key}
              highlighted={evState.highlight === key}
              handleMouseEnter={handleMouseEnter}
              handleMouseLeave={handleMouseLeave}
              handleEventClick={handleEventClick}
            />
            )})}
            </ul>
      </>)
}
 
export default EventList;