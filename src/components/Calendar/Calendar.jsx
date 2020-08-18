import React, { useState, useEffect } from "react";
import Month from "./Month";

const Calendar = ({ state: settings, functions }) => {
  const [state, setState] = useState({
    year: undefined,
    month: undefined
  });
  useEffect(() => {
    const dt = new Date(Date.now());
    setState({ year: dt.getFullYear(), month: dt.getMonth() });
  }, []);
  const pageLast = () => {
    if (state.month === 0) {
      setState({year: state.year - 1, month: 11})
    } else{
      setState({...state, month:state.month -1 })
    }
  }
  const pageNext = () => {
    if (state.month === 11) {
      setState({year: state.year + 1, month: 0})
    } else{
      setState({...state, month:state.month + 1 })
    }
  }
  return (
    <>
      <div className="div-calendar">
        <Month settings={settings} startMonth={state.month} startYear={state.year} functions={functions} />
      </div>
      <span>
        <button onClick={pageLast}>{"<"}</button>
        <button onClick={pageNext}>{">"}</button>
      </span>
    </>
  );
};

export default Calendar;
