import eventObject from "./Calendar/event.json";

const testEvents = [
  "09:00am - coffee & code",
  "11:45am - sudo apt update",
  "11:46am - sudo apt upgrade",
  "11:47am - coffee & code"
].map((text) => {
  const [start, title] = text.split(" - ");
  return {
    ...eventObject,
    summary: title,
    start: {
      date: "date",
      datetime: start,
      timeZone: ""
    }
  };
});

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
