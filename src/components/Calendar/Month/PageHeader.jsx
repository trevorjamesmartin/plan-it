import React from 'react';

const PageHeader = ({month, year, pageNext, pageLast}) => {
  return ( <>
    <div className="cal-year">
    <p className="text-year">{year}</p>
  </div>
  <div className="cal-month">
    <span className="span-cal-month">
      <button className="btn-month" onClick={pageLast}>
        ⇦
      </button>
      <div className="div-month-name">
        <h1 className="h1-month">{month}</h1>
      </div>
      <button className="btn-month" onClick={pageNext}>
        ⇨
      </button>
    </span>
  </div>
</>
   );
}
 
export default PageHeader;