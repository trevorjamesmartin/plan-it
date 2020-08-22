import React, {useState} from "react";
import eventObject from "../util/event.json";

const EventForm = ({ ev, handleSubmit }) => {
  const [calEvent, setCalEvent] = useState({ ...eventObject, ...ev });
  const [dt, setDt] = useState({ start: ev.start.datetime, dt: Date(ev.start.date), duration: 15 });
  const handleFormData = (e) => {
    setCalEvent({
      ...calEvent,
      [e.target.id]: e.target.value
    });
  };
  const handleTimeData = e => {
    setDt({...dt, [e.target.id]: e.target.value})
  }
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const start = { ...calEvent.start };
    start.datetime = dt.start;

    const updated = { ...calEvent, start };
    handleSubmit(updated); // updated event.
    // console.log(calEvent);
  };
  const handleDuration = e => {
    e.preventDefault();
    setDt({...dt, duration: e.target.value});
  }
  return (
    <form className="event-form" onSubmit={handleFormSubmit}>
      <label htmlFor="start">start:</label>
      <input
        type="time"
        id="start"
        value={dt.start}
        onChange={handleTimeData}
      />
      <label htmlFor="minutes">minutes:</label>
      <input
        type="number"
        id="minutes"
        value={dt.duration}
        onChange={handleDuration}
      />
      <label htmlFor="summary">summary:</label>
      <input
        type="text"
        id="summary"
        placeholder="title/summary"
        value={calEvent.summary}
        onChange={handleFormData}
      />
      <button>save</button>
    </form>
  );
};


export default EventForm;

