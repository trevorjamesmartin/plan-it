import React, { useState, useEffect } from "react";
import Day, { DayView } from "./Day";
import genCal from "./genCal";
import { DAY_NAMES, MONTH_NAMES, defaultMonthState } from "./config";

const Month = ({
  pageLast,
  pageNext,
  settings,
  startMonth,
  startYear,
  functions
}) => {
  const [state, setState] = useState(defaultMonthState);
  useEffect(() => {
    const { month, days, year } = genCal({
      language: settings.language,
      startMonth,
      startYear
    });
    setState({ abbrv: state.abbrv, days, month, year });
  }, [settings.language, startMonth, startYear, state.abbrv]);
  const overView = ({
    month: selectMonth,
    n: selectDay,
    day: selectWeekDay
  }) => {
    const key = {
      yyyy: state.year,
      mm: MONTH_NAMES["en"].indexOf(selectMonth) + 1,
      dd: selectDay
    };
    // console.log(key);
    const { yyyy, mm, dd } = key;
    const events = functions.getEvents({ yyyy, mm, dd }); // get events for this day.
    setState({ ...state, selectDay, selectMonth, selectWeekDay, events });
  };
  const today = new Date(Date.now());
  const year = startYear || today.getFullYear();
  const handleMouseOver = (n) => {
    setState({ ...state, weekDay: n });
  };
  const toggleNameView = (n) => {
    setState({ ...state, weekDay: DAY_NAMES["en"][n] });
  };
  return (
    <div className="div-month">
      <div className="cal-year">
        <p className="text-year" >{state.year}</p>
      </div>
      <div className="cal-month">
        <span style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <button className="btn-month" onClick={pageLast}>{"<"}</button>

          <div style={{ width: "25ch", textAlign: "center" }}>
            <h1 className="h1-month">{state.month}</h1>
          </div>

          <button className="btn-month" onClick={pageNext}>{">"}</button>
        </span>
      </div>
      <div className="dash-grid-headers">
        {DAY_NAMES[settings.language].map((n, k) => (
          <div key={k} className="div-week-name">
            <div
              className="text-week-name"
              onMouseEnter={() => handleMouseOver(n)}
              onMouseLeave={() => handleMouseOver(undefined)}
            >
              {state.weekDay !== n ? n[0] : n}
            </div>
          </div>
        ))}
      </div>
      <div className="dash-grid-container">
        {state.days.map(({ n, month, day: toggle }, i) => (
          <Day
            other={month !== state.month}
            month={month}
            today={today.getDate() === 1 + n && year === state.year}
            key={i}
            n={(n % 31) + 1}
            toggle={toggle}
            toggleNameView={(val) =>
              val === -1 ? toggleNameView(undefined) : toggleNameView(toggle)
            }
            showEvents={() => overView({ month, n: n + 1, day: toggle })}
          />
        ))}
      </div>
      <DayView
        open={state.selectDay !== undefined}
        close={() => setState({ ...state, selectDay: undefined })}
        month={state.selectMonth}
        day={state.selectDay}
        weekday={DAY_NAMES[settings.language][state.selectWeekDay]}
        year={state.year}
      >
        {state.selectDay ? (
          <>
            <p>
              list of events for {state.selectMonth}-{state.selectDay}-
              {state.year}...
            </p>
            {state.events
              ? state.events.map((ev, i) => <p className="p-event" key={i} >{ev.start.datetime} ∙ {ev.summary}</p>)
              : "daily events go here."}
          </>
        ) : (
          ""
        )}
      </DayView>
    </div>
  );
};

export default Month;
