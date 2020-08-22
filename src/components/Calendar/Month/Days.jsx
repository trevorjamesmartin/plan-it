import React from 'react';
import Day from './Day';
import {DAY_NAMES} from '../util/config';

const Days = ({ state, settings, toggleNameView, overView, handleMouseOver, startYear }) => {
  const today = new Date(Date.now());
  const year = startYear || today.getFullYear();
  return (<> 
    <div className="days-grid-headers">
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
  <div className="days-grid-container">
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
   </>);
}
 
export default Days;