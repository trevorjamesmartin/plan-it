import React from "react";

const Event = ({
  ev,
  name,
  highlighted,
  handleMouseEnter,
  handleMouseLeave,
  handleEventClick
}) => {
  return (
    <li
      onClick={() => handleEventClick(ev)}
      onMouseEnter={() => handleMouseEnter(name)}
      onMouseLeave={handleMouseLeave}
      className={highlighted ? "li-event-hover" : "li-event"}
      name={name}
    >
      {ev.start.datetime} ∙ {ev.summary}
    </li>
  );
};

export default Event;
