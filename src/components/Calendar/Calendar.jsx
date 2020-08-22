import React, { useState, useEffect } from "react";
import Month from "./Month";

const Calendar = ({ settings, functions, month, year }) => {
  const [state, setState] = useState({ year, month });
  useEffect(() => {
    const dt = new Date(Date.now());
    setState({ year: year || dt.getFullYear(), month: month || dt.getMonth() });
  }, [year, month]);
  const pageLast = () => {
    if (state.month === 0) {
      setState({ year: state.year - 1, month: 11 });
    } else {
      setState({ ...state, month: state.month - 1 });
    }
  };
  const pageNext = () => {
    if (state.month === 11) {
      setState({ year: state.year + 1, month: 0 });
    } else {
      setState({ ...state, month: state.month + 1 });
    }
  };
  return (
    <>
      <div className="div-calendar">
        <Month
          pageLast={pageLast}
          pageNext={pageNext}
          settings={ settings || { language: "en" }}
          startMonth={state.month}
          startYear={state.year}
          functions={functions}
        />
      </div>
    </>
  );
};

export default Calendar;
