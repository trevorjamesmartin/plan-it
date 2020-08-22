import { MONTH_NAMES } from "./config";

export const dtAdjust = {
  addDays: function(days, dt) {
    const dt2 = new Date(dt.valueOf() + (days * 86400000));
    return dt2
  },
  subDays: function(days, dt) {
    const dt2 = new Date(dt.valueOf() - (days * 86400000));
    return dt2
  },
  addHours: function(hours, dt) {
    const dt2 = new Date(dt.valueOf() + (hours * 3600000));
    return dt2
  },
  subHours: function(hours, dt) {
    const dt2 = new Date(dt.valueOf() - (hours * 3600000));
    return dt2
  },
  addMinutes: function(mins, dt) {
    const dt2 = new Date(dt.valueOf() + (mins * 60000));
    return dt2
  },
  subMinutes: function(mins, dt) {
    const dt2 = new Date(dt.valueOf() - (mins * 60000));
    return dt2
  },
  addSeconds: function(mins, dt) {
    const dt2 = new Date(dt.valueOf() + (mins * 1000));
    return dt2
  },
  subSeconds: function(mins, dt) {
    const dt2 = new Date(dt.valueOf() - (mins * 1000));
    return dt2
  },
}

function fortyTwoDays({language, startMonth, startYear}) {
  // const nDays = (n) => n * 86400000;
  const days = [];
  
  // determine month & year
  const mm = startMonth;
  const year = startYear;
  const month = MONTH_NAMES[language][mm];

  // derive zero-day from day 1 of month, year
  const zero = new Date(`${month} 1, ${year}`);
  const firstDay = zero.getDay(); // day of week
  const nextMonth = new Date(`${MONTH_NAMES[language][mm === 11 ? 0 : mm + 1]} 1, ${year}`);
  // console.log('next Month', nextMonth.getMonth())
  const lastDay = dtAdjust.subDays(1, nextMonth)  //new Date(nextMonth.valueOf() - nDays(1));

  // last month
  const lastMonthName = MONTH_NAMES[language][mm === 0 ? 11 : mm - 1];
  for (let i = firstDay + 1; i > 1; i--) {
    const ndt = dtAdjust.subDays(i, zero)  //new Date(zero.valueOf() - nDays(i));
    // console.log(ndt)
    days.push({ n: ndt.getDate(), month: lastMonthName, day: (ndt.getDay() + 1) % 7});
  }

  // this month.
  for (let i = 0; i < lastDay.getDate(); i++) {
    const ndt = dtAdjust.addDays(i, zero)  // new Date(zero.valueOf() + nDays(i));
    days.push({ month, n: i,  day: ndt.getDay()  });
  }
  // next month ?
  const nextMonthName =
    MONTH_NAMES[language][
      mm === 11 ? 0 : mm + 1
    ];
  const daysLeft = 42 - days.length;
  for (let i= 0; i < daysLeft; i++){
    const ndt = dtAdjust.addDays(i, nextMonth)  //new Date(nextMonth.valueOf() + nDays(i));
    days.push({month: nextMonthName, n: i, day: ndt.getDay() })
  }

  // calendar page
  return { month, days, year }
}


export default fortyTwoDays;