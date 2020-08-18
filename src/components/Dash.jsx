import React, {useState} from 'react';
import Login from './Login';
import Calendar from './Calendar'
// import {userBase} from "./Calendar/config"
import "./Calendar/style.css"


function removeKey(keyname, state){
    const value = state[keyname]
    const remKey = Object.keys(state).filter(v => v !== keyname)
    const nextState = {};
    remKey.forEach(key => nextState[key] = state[key]);
    return [value, nextState]
}

const Dash = () => {
  const [state, setState] = useState({email: "", password: "", toggle: false, language: 'en'})
  const updateToken = (e) => {
    e.preventDefault();
    setState({...state, [e.target.name]: e.target.value})
  }
  const loginUser = () => {
    // verify user... 
    // const noUser = (!userBase[state.email]);
    // const wrongPass = (userBase[state.email] !== state.password);
    // if (noUser || wrongPass) {
    //   return false
    // }
    // close login window
    const [, nxt] = removeKey('password', {...state, toggle: true})
    setState(nxt);
    return true
  }
  return (
    <div className="div-dash">
      <Calendar state={state} />
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