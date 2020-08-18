import React, {useEffect, useRef} from 'react';
import ReactDom from 'react-dom';
import {MODAL_STYLES, OVERLAY_STYLES} from './Calendar/config';

const Login = ({ open, email, password, updateToken, toggle, start }) => {
  const emailRef = useRef();
  const btnRef = useRef();
  useEffect(() => {
    open && emailRef.current.focus();
  }, [open]);
  if (!open) return null;
  const onKeyUp = (e) => {
    if (e.charCode === 13) {
      btnRef.current.click();
    }
  };

  return ReactDom.createPortal(
    <>
      <div style={OVERLAY_STYLES} />
      <div className="div-modal" style={MODAL_STYLES}>
        <div className="div-login">
          <input
            ref={emailRef}
            name="email"
            type="email"
            className="input-login"
            placeholder="email"
            value={email}
            onKeyPress={onKeyUp}
            onChange={updateToken}
            disabled={toggle}
            autoFocus
          />
          <input
            name="password"
            type="password"
            className="input-login"
            placeholder="password"
            value={password}
            onKeyPress={onKeyUp}
            onChange={updateToken}
            autoFocus
          />
          <button
            ref={btnRef}
            className="btn-login"
            onClick={start}
            disabled={!email || email.length < 3 || password.length < 8}
          >
            Sign In
          </button>
        </div>
      </div>
    </>,
    document.getElementById("portal")
  );
};
export default Login;