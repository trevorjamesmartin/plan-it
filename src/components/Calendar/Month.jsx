import React, { useState, useEffect } from "react";
import Day, { DayView } from "./Day";
import genCal from "./genCal";

const Month = ({ settings, startMonth, startYear }) => {
  const [state, setState] = useState({
    days: [],
    month: "",
    year: undefined,
    selectDay: undefined,
    selectMonth: undefined
  });
  useEffect(() => {
    const { month, days, year } = genCal({ language: settings.language, startMonth, startYear });
    setState({ days, month, year });
  }, [settings.language, startMonth, startYear]);
  const overView = ({ month: selectMonth, n: selectDay }) => {
    setState({ ...state, selectDay, selectMonth });
  };
  const today = new Date(Date.now());
  const year = startYear || today.getFullYear();
  return (
    <div className="div-month">
      <h1>{state.month}</h1>
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
