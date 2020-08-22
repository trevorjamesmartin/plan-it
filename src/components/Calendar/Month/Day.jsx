import React, { useState, useEffect } from "react";

const Day = ({ n, month, other, today, toggle, toggleNameView, ...props }) => {
  const [cls, setCls] = useState(other ? "div-day-other" : "div-day");
  useEffect(() => {
    setCls(other ? "div-day-other" : "div-day");
  }, [other]);
  return (
    <div
      className={cls}
      onMouseEnter={() => {
        setCls("div-day-hover");
        toggleNameView();
      }}
      onMouseLeave={() => {
        toggleNameView(-1);
        setCls(other ? "div-day-other" : "div-day");
      }}
      onClick={() => props.showEvents(n)}
      name={n}
      month={month}
    >
      <p className="p-day-number">{today ? `${n}*` : n}</p>
    </div>
  );
};

export default Day;
