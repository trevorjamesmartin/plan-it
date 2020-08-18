import React, { useState } from "react";
import Login from "./Login";

import Calendar from "./Calendar";
import "./Calendar/style.css";
// import {userBase} from "./Calendar/config"
function removeKey(keyname, state) {
  const value = state[keyname];
  const remKey = Object.keys(state).filter((v) => v !== keyname);
  const nextState = {};
  remKey.forEach((key) => (nextState[key] = state[key]));
  return [value, nextState];
}

const Dash = () => {
  const [state, setState] = useState({
    email: "",
    password: "",
    toggle: false,
    language: "en"
  });
  const updateToken = (e) => {
    e.preventDefault();
    setState({ ...state, [e.target.name]: e.target.value });
  };
  const loginUser = () => {
    // verify user, then close login window & delete password.
    const [, nxt] = removeKey("password", { ...state, toggle: true });
    setState(nxt);
    return true;
  };
  const getEvent = ({ yyyy, mm, dd, hhmmss }) => {
    // calendar will call getEvent to display details
    return "details";
  };
  const getEvents = ({ yyyy, mm, dd }) => {
    // return events occurring on yyyy-mm-dd
    return ["09:00am - coffee & code", "11:45am - sudo apt update",  "11:46am - sudo apt upgrade", "11:47am - coffee & code"];
  };
  const setEvent = ({ event, key: { yyyy, mm, dd, hhmmss } }) => {
    // details are displayed in "day-view-body" classa
    return "ok";
  };
  return (
    <div className="div-dash">
      <Calendar state={state} functions={{ getEvents, getEvent, setEvent }} />
      <Login
        email={state.email}
        password={state.password}
        updateToken={updateToken}
        toggle={state.toggle}
        start={loginUser}
        open={!state.toggle}
      />
    </div>
  );
};

export default Dash;
