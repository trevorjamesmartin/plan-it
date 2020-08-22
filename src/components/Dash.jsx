import React, { useEffect } from "react";
// import Login from "./Login";
// import { verifiedUser } from "./AuthCallback";
import Calendar from "./Calendar"; // display
import { getEvent, getEvents, setEvent, calendarData } from "./calendarIO"; // io

// import {userBase} from "./Calendar/config"

const Dash = ({ state, setState }) => {
  const data = calendarData;
  useEffect(() => {
    console.log(data ? 1:0)
    // const data = { ...calendarData };
    // setState({ ...state, data });
  });
  const updateSettings = upd => {
    setState({...state, ...upd })
  }
  // const updateToken = (e) => {
  //   e.preventDefault();
  //   setState({ ...state, [e.target.name]: e.target.value });
  // };
  // function removeKey(keyname, state) {
  //   const value = state[keyname];
  //   const remKey = Object.keys(state).filter((v) => v !== keyname);
  //   const nextState = {};
  //   remKey.forEach((key) => (nextState[key] = state[key]));
  //   return [value, nextState];
  // }
  // const loginUser = () => {
  //   // verify user, then close login window & delete password.
  //   const [, nxt] = removeKey("password", { ...state, toggle: true });
  //   setState(nxt);
  //   return true;
  // };

  return (
    <div className="div-dash">
      <br />
      <Calendar
        className="calendar-component"
        settings={state}
        updateSettings={updateSettings}
        functions={{ getEvents, getEvent, setEvent }}
      />
      {/* <Login
        email={state.email}
        password={state.password}
        updateToken={updateToken}
        toggle={state.toggle}
        start={loginUser}
        open={!state.toggle}
      /> */}
    </div>
  );
};

export default Dash;
