import React, { useState, useEffect } from "react";
import Day, { DayView } from "./Day";
import genCal from "./genCal";
import { DAY_NAMES } from "./config";

const Month = ({ settings, startMonth, startYear }) => {
  const [state, setState] = useState({
    days: [],
    month: "",
    year: undefined,
    selectDay: undefined,
    selectMonth: undefined,
    abbrv: true,
    weekDay: undefined
  });
  useEffect(() => {
    const { month, days, year } = genCal({
      language: settings.language,
      startMonth,
      startYear
    });
    setState({ abbrv: state.abbrv, days, month, year });
  }, [settings.language, startMonth, startYear, state.abbrv]);
  const overView = ({ month: selectMonth, n: selectDay }) => {
    setState({ ...state, selectDay, selectMonth });
  };
  const today = new Date(Date.now());
  const year = startYear || today.getFullYear();
  const handleMouseOver = (n) => {
    setState({ ...state, weekDay: n });
  };
  const toggleNameView = (n) => {
    setState({...state, weekDay: DAY_NAMES["en"][n]})
  }
  return (
    <div className="div-month">
      <div className="cal-year">
        <h4>{state.year}</h4>
      </div>
      <div className="cal-month">
        <h1>{state.month}</h1>
      </div>
      <div className="dash-grid-headers">
        {DAY_NAMES[settings.language].map((n) => (
          <div className="div-week-name">
            <h4
              onMouseEnter={() => handleMouseOver(n)}
              onMouseLeave={() => handleMouseOver(undefined)}
            >
              {state.weekDay !== n ? n[0] : n}
            </h4>
          </div>
        ))}
      </div>
      <div className="dash-grid-container">
        {state.days.map(({ n, month, day:toggle }, i) => (
          <Day
            other={month !== state.month}
            month={month}
            today={today.getDate() === 1 + n && year === state.year}
            key={i}
            n={(n % 31) + 1}
            toggle={toggle}
            toggleNameView={(val) => val === -1 ? toggleNameView(undefined) : toggleNameView(toggle)}
            showEvents={() => overView({ month, n: n + 1 })}
          />
        ))}
      </div>
      <DayView
        open={state.selectDay !== undefined}
        close={() => setState({ ...state, selectDay: undefined })}
        month={state.selectMonth}
        day={state.selectDay}
      />
    </div>
  );
};

export default Month;
