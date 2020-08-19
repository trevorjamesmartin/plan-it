import React, { useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";

export function verifiedUser(appState) {
  return appState !== undefined // todo: parse appState
}

const AuthCallback = ({ setValue }) => {
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    setValue(location.pathname); // todo: parse
    history.push("/"); // return to dashboard
  }, [history, location.pathname, setValue]);

  return <h1>:)</h1>;
};

export default AuthCallback;
