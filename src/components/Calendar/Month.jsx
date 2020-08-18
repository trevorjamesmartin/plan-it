import React, { useState, useEffect } from "react";
import Day, { DayView } from "./Day";
import { MONTH_NAMES } from "./config";

const Month = ({ settings }) => {
  const [state, setState] = useState({
    days: [],
    month: "",
    selectDay: undefined,
    selectMonth: undefined
  });
  useEffect(() => {
    const dt = new Date(Date.now());
    const days = [];
    const year = dt.getFullYear();
    const month = MONTH_NAMES[settings.language][dt.getMonth()];
    const zero = new Date(`${month} 1, ${year}`);
    const firstDay = zero.getDay();
    const nextMonth = new Date(`${month + 1} 1, ${year}`);
    const nDays = (n) => n * 86400000;
    const lastDay = new Date(nextMonth.valueOf() - nDays(1));
    // previous month
    const lastMonth =
      MONTH_NAMES[settings.language][
        dt.getMonth() === 0 ? 12 : dt.getMonth() - 1
      ];

    for (let i = firstDay + 1; i > 1; i--) {
      const ndt = new Date(zero.valueOf() - nDays(i));
      days.push({ n: ndt.getDate(), month: lastMonth });
    }
    // this month
    for (let i = 0; i < lastDay.getDate(); i++) {
      days.push({ month, n: i });
    }

    setState({ days, month });
  }, [settings.language]);
  const overView = ({ month: selectMonth, n: selectDay }) => {
    setState({ ...state, selectDay, selectMonth });
  };
  const todaysDate = new Date(Date.now()).getDate();
  return (
    <div className="div-month">
      <h1>{state.month}</h1>
      <div className="dash-grid-container">
        {state.days.map(({ n, month }, i) => (
          <Day
            other={month !== state.month}
            month={month}
            today={todaysDate === 1 + n}
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
