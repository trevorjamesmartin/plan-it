import React, { useState, useEffect } from "react";

import DayView from "./DayView";
import EventList from "../Event/EventList";
import EventForm from "../Event/EventForm";
import PageHeader from "./PageHeader"

import Days from "./Days";
import fortyTwoDays from "../util/fortyTwoDays";
import { DAY_NAMES, MONTH_NAMES, defaultMonthState } from "../util/config";
import eventObject from "../util/event.json"

const Month = ({
  pageLast,
  pageNext,
  settings,
  startMonth,
  startYear,
  functions
}) => {
  const [state, setState] = useState(defaultMonthState);
  const [evState, setEvState] = useState({ highlight: undefined });
  const [evForm, setEvForm] = useState(undefined);

  useEffect(() => {
    const { month, days, year } = fortyTwoDays({
      language: settings.language,
      startMonth,
      startYear
    });
    setState({ abbrv: state.abbrv, days, month, year });
  }, [settings.language, startMonth, startYear, state.abbrv]);

  // show events for the day
  const overView = ({
    month: selectMonth,
    n: selectDay,
    day: selectWeekDay
  }) => {
    const key = {
      yyyy: state.year,
      mm: MONTH_NAMES[settings.language].indexOf(selectMonth) + 1,
      dd: selectDay
    };
    const { yyyy, mm, dd } = key;
    const events = functions.getEvents({ yyyy, mm, dd }); // get events for this day.
    setState({ ...state, selectDay, selectMonth, selectWeekDay, events });
  };

  const handleSubmitEvent = (ev) => {
    console.log("save the event");
    setEvForm(undefined); // clear the form
    const [yyyy, mm, dd] = ev.start.date.split('-');
    const hhmmss = ev.start.datetime
    functions.setEvent({ event:ev, key: { yyyy, mm, dd, hhmmss } })
    state.events.push(ev); // TODO: connect to storage
  };

  const handleDeleteEvent = (ev) => {
    console.log('deleting')
    const upd = state.events.filter(i => i !== ev)
    setState({...state, events: [...upd] })
  }
  const handleCloseDay = () => {
    console.log("close the day");
    setState({ ...state, selectDay: undefined, events: [] }); // close the day
    setEvForm(undefined); // close the form
  };
  const eventListHandlers = {
    handleMouseEnter: (evName) => setEvState({ highlight: evName }),
    handleMouseLeave: () => setEvState({ highlight: undefined }),
    handleEventClick: (ev) => setEvForm(ev),
    handleAddEvent: (ymd) => setEvForm(
      {...eventObject, 
        start: {...eventObject.start, date: ymd},
        created: Date.now()
      })
  };
  const monthProps = {
    state,
    settings,
    toggleNameView: (n) => setState({ ...state, weekDay: DAY_NAMES["en"][n] }),
    overView,
    handleMouseOver: (n) => setState({ ...state, weekDay: n }),
    startYear
  };
  const dayViewProps = {
    open: state.selectDay !== undefined,
    close: handleCloseDay,
    month: state.selectMonth,
    day: state.selectDay,
    weekday: state.selectWeekDay,
    year: state.year,
    functions,
    language: settings.language
  };
  const headerProps = {
    year: state.year,
    month: state.month,
    pageNext,
    pageLast
  };
  return (
    <div className="div-month">
      <PageHeader {...headerProps} />
      <Days {...monthProps} />
      <DayView {...dayViewProps}>
        {evForm ? (
          <EventForm ev={evForm} handleSubmit={handleSubmitEvent} handleDelete={handleDeleteEvent} />          
        ) : state.selectDay ? (
          <EventList {...{ state, settings, evState }} handlers={eventListHandlers} />
        ) : (
          ""
        )}
      </DayView>
    </div>
  );
};

export default Month;
