import React from "react";
import ReactDom from "react-dom";
import { OVERLAY_STYLES_2, MODAL_STYLES_2, DAY_NAMES } from "../util/config";

const DayView = ({ year, month, day, weekday, open, close, language, ...props }) => {
  if (!open) return null; // guard 2 prevents rendering
  // renders DayView above the normal monthly calendar view.
  const dayOfWeek = DAY_NAMES[language][weekday];
  return ReactDom.createPortal(
    <>
      <div style={OVERLAY_STYLES_2} />
      <div className="day-view" style={MODAL_STYLES_2}>
        <div className="day-view-header">
          <p>
            {dayOfWeek} {month} {day}, {year}
          </p>
          <button onClick={close}>X</button>
        </div>
        <br />
        <div className="day-view-body">
          {props.children}
        </div>
      </div>
    </>,
    document.getElementById("portal")
  );
};

export default DayView;
