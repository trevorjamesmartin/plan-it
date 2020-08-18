import React, { useState, useEffect } from "react";
import ReactDom from "react-dom";
import { OVERLAY_STYLES_2, MODAL_STYLES_2 } from "./config";

export const DayView = ({month, day, open, close,...props}) => {
  if (!open) return null;

  return ReactDom.createPortal(
    <>
      <div style={OVERLAY_STYLES_2} />
      <div className="day-view" style={MODAL_STYLES_2}>
      <div className="day-view-header">
        <h2>{month} {day}</h2>
        <button onClick={close}>X</button>
      </div>
      </div>
    </>,
    document.getElementById("portal")
  );
};

const Day = ({ n, month, other, today, toggle, toggleNameView, ...props }) => {
  const [cls, setCls] = useState(other ? "div-day-other" : "div-day");
  useEffect(()=>{
    setCls(other ? "div-day-other" : "div-day")
  }, [other])
  return (
    <div
      className={cls}
      onMouseEnter={() => {
        setCls("div-day-hover")
        toggleNameView()
      }}
      onMouseLeave={() => {
        toggleNameView(-1)
        setCls(other ? "div-day-other" : "div-day")
      }}
      onClick={() => props.showEvents(n)}
      name={n}
      month={month}
    >
      {today ? `${n}*`:n}
    </div>
  );
};

export default Day;
