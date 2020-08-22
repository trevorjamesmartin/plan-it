import eventObject from "./Calendar/util/event.json";
// structure based on https://developers.google.com/calendar/v3/reference/events
// import { dtAdjust } from "./Calendar/genCal";

// generate some events to display.
const testEvents = [
  "09:00 - coffee & code",
  "11:45 - sudo apt update",
  "11:46 - sudo apt upgrade",
  "11:47 - coffee & code"
].map((text, i) => {
  const dt = new Date();
  // const dt = dtAdjust.addDays(i, dt0);
  const gmtoffset = dt.toString().split(' (')[0].split(' ').pop();
  const dt_date = dt.toISOString().split("T")[0];
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
  const dt = new Date(`${yyyy}-${mm}-${dd}`);
  const dateString = dt.toJSON().split('T')[0];
  const evToday = testEvents.filter(ev=> ev.start.date === dateString)
  console.log(`calendarIO - getEvents for ${dateString}`)
  return evToday;
};

export const setEvent = ({ event, key: { yyyy, mm, dd, hhmmss } }) => {
  // details are displayed in "day-view-body" classa
  return "ok";
};

export const createEvent = (details) => ({ ...eventObject, ...details });
