import React, {useState} from "react";
import { Route, Switch } from "react-router-dom";
import Dash from "./components/Dash";
import AuthCallback from "./components/AuthCallback"

function App() {
  const [state, setState] = useState()
  return (
    <Switch>
      <Route path="/" exact component={() => <Dash state={state} setState={setState} />} />
      <Route path="/oauth2-callback" component={() => <AuthCallback setValue={setState} />} />
    </Switch>
  );
}

export default App;
