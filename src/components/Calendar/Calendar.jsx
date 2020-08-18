import React from "react";
import Month from "./Month";

const Calendar = ({ state: settings }) => {
  return (
    <>
      <div className="div-calendar">
        <Month settings={settings} />
      </div>
    </>
  );
};

export default Calendar;
