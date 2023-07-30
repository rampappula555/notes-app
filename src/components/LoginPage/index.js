import "./index.css";
import React, { useContext, useEffect, useRef, useState } from "react";
import UserDetailsContext from "../../context/UserDetailsContext";
import { Navigate, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
const LoginPage = () => {
  const usernameRef = useRef();
  const navigate = useNavigate();
  const value = useContext(UserDetailsContext);
  const { userDetailsList, toggleIsLoggedIn, isLoggedIn, updateActiveUserId } =
    value;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  function onChangeUsername(event) {
    setUsername(event.target.value);
  }
  function onChangePassword(event) {
    setPassword(event.target.value);
  }
  function onChangeShowPassword(event) {
    setShowPassword(event.target.checked);
  }
  function setActiveUserId(id) {
    updateActiveUserId(id);
  }
  function onSubmitUserdetails() {
    const validUser = userDetailsList.some(
      (eachUser) => eachUser.username === username
    );
    if (!validUser) {
      setErrorMessage("user not found please signup");
      setShowErrorMessage(true);
    } else if (validUser) {
      const filteredList = userDetailsList.filter(
        (eachUser) => eachUser.username === username
      );
      const validUserName = filteredList[0]?.username === username;
      const validPassword = filteredList[0]?.password === password;
      if (!validPassword) {
        setErrorMessage("incorrect password");
        setShowErrorMessage(true);
      } else if (validUserName && validPassword) {
        setErrorMessage("");
        setShowErrorMessage(false);
        toggleIsLoggedIn(true);
        setActiveUserId(filteredList[0]?.id);
        navigate("/", { replace: true });
      }
    }
  }
  function onSubmitForm(event) {
    event.preventDefault();
    if (username.trim() === "" || password.trim() === "") {
      setErrorMessage("enter valid details");
      setShowErrorMessage(true);
      return;
    }
    onSubmitUserdetails();
  }
  useEffect(() => {
    if (usernameRef.current) {
      usernameRef.current.focus();
    }
  }, []);
  if (isLoggedIn) {
    return <Navigate to="/" replace />;
  }
  return (
    <div className="login-page-main-container">
      <form onSubmit={onSubmitForm}>
        <label htmlFor="username">USERNAME</label>
        <br />
        <input
          ref={usernameRef}
          type="text"
          onChange={onChangeUsername}
          value={username}
          id="username"
        />
        <br />
        <label htmlFor="password">PASSWORD</label>
        <br />
        <input
          type={showPassword ? "text" : "password"}
          onChange={onChangePassword}
          value={password}
          id="password"
        />
        <br />
        {password.length > 0 && (
          <input
            type="checkbox"
            onChange={onChangeShowPassword}
            value={showPassword}
            id="showPassword"
          />
        )}
        {password.length > 0 && (
          <label htmlFor="showPassword">show password</label>
        )}
        <br />
        <button type="submit">login</button>
        {showErrorMessage && <p>*{errorMessage}</p>}
        <hr />
        <div className="login-form-signup-section">
          <p>Don't have an account?</p>
          <Link type="button" className="sign-up-button" to="/sign-up">
            sign up
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
