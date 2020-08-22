import React, {useState} from "react";
import { Route, Switch } from "react-router-dom";
import Dash from "./components/Dash";
import AuthCallback from "./components/AuthCallback"
import Embedded from "./components/Embedded";
import "./components/Calendar/style.css";

function App() {
  const [state, setState] = useState({email: "", password: "", language: "en"})
  return (
    <Switch>
      <Route path="/" exact component={() => <Dash state={state} setState={setState} />} />
      <Route path="/oauth2-callback" component={() => <AuthCallback setValue={setState} />} />
      <Route path="/embed" exact component={() => <Embedded settings={state} />} />
    </Switch>
  );
}

export default App;
