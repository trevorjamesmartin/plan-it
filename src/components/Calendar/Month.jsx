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
    selectMonth: undefined
  });
  useEffect(() => {
    const { month, days, year } = genCal({
      language: settings.language,
      startMonth,
      startYear
    });
    setState({ days, month, year });
  }, [settings.language, startMonth, startYear]);
  const overView = ({ month: selectMonth, n: selectDay }) => {
    setState({ ...state, selectDay, selectMonth });
  };
  const today = new Date(Date.now());
  const year = startYear || today.getFullYear();
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
            <h4>{n}</h4>
          </div>
        ))}
      </div>
      <div className="dash-grid-container">
        {state.days.map(({ n, month }, i) => (
          <Day
            other={month !== state.month}
            month={month}
            today={today.getDate() === 1 + n && year === state.year}
            key={i}
            n={(n % 31) + 1}
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
