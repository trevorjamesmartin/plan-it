import eventObject from "./Calendar/event.json";
// structure based on https://developers.google.com/calendar/v3/reference/events
import { dtAdjust } from "./Calendar/genCal";

// generate some events to display.
const testEvents = [
  "09:00am - coffee & code",
  "11:45am - sudo apt update",
  "11:46am - sudo apt upgrade",
  "11:47am - coffee & code"
].map((text, i) => {
  const dt0 = new Date();
  const dt = dtAdjust.addDays(i, dt0);
  const gmtoffset = dt.toString().split(' (')[0].split(' ').pop();
  const dt_date = dt.toISOString().split("T")[0];
  // const dt_datetime = dt.toISOString().split("T")[1].split(".")[0];
  const [start, title] = text.split(" - ");
  return {
    ...eventObject,
    summary: title,
    start: {
      date: dt_date,
      datetime: start,
      timeZone: gmtoffset
    }
  };
});

// data structure for local storage.
export const calendarData = { calendarEvents: [...testEvents] };


export const getEvent = ({ yyyy, mm, dd, hhmmss }) => {
  // calendar will call getEvent to display details
  return "details";
};

export const getEvents = ({ yyyy, mm, dd }) => {
  // return events occurring on yyyy-mm-dd
  return testEvents;
};

export const setEvent = ({ event, key: { yyyy, mm, dd, hhmmss } }) => {
  // details are displayed in "day-view-body" classa
  return "ok";
};

export const createEvent = (details) => ({ ...eventObject, ...details });
