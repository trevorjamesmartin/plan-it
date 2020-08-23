import React, {useState} from "react";
import eventObject from "../util/event.json";

const EventForm = ({ ev, handleSubmit, handleDelete }) => {
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
    if (dt.action === 'delete'){
      console.log('delete');
      handleDelete(calEvent)
      return
    }
    console.log('check start time')
    if (dt.start === 'datetime') return // require a starting time
    console.log('check summary')
    if (calEvent.summary === "") return // require a description
    handleSubmit({ ...calEvent, start: { ...calEvent.start, datetime: dt.start }}); // updated event.
  };
  const handleDuration = e => {
    e.preventDefault();
    setDt({...dt, duration: e.target.value});
  }
  return (
    <>
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
      <button id="save" name="save" onClick={() => setDt({...dt, action: 'save'})}>save</button>
      <button id="delete" name="delete" onClick={() => setDt({...dt, action: 'delete'})}>delete</button>
    </form>
    </>
  );
};


export default EventForm;

