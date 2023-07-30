import "./index.css";
import React, { useContext, useEffect, useRef, useState } from "react";
import UserDetailsContext from "../../context/UserDetailsContext";
import { v4 as uuidv4 } from "uuid";
import { useLocation, useNavigate, Link, Navigate } from "react-router-dom";
const SignupPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const usernameRef = useRef();
  const value = useContext(UserDetailsContext);
  const {
    userDetailsList,
    addNewUserDetails,
    toggleIsLoggedIn,
    updateActiveUserId,
    createNewNotes,
    isLoggedIn,
  } = value;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [conformationPassword, setConformationPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  function onChangeUsername(event) {
    setUsername(event.target.value);
  }
  function onChangePassword(event) {
    setPassword(event.target.value);
  }
  function onChangeConformationPassword(event) {
    setConformationPassword(event.target.value);
  }
  function onChangeShowPassword(event) {
    setShowPassword(event.target.checked);
  }

  function onSubmitFormDetails() {
    const alreadyUsedUsername = userDetailsList.some(
      (eachUser) => eachUser.username === username
    );
    if (alreadyUsedUsername) {
      setErrorMessage("username already used");
      setShowErrorMessage(true);
    } else {
      const id = uuidv4();
      const date = new Date();
      const day = ("0" + date.getDate()).slice(-2);
      const month = ("0" + (date.getMonth() + 1)).slice(-2);
      const year = date.getFullYear();

      addNewUserDetails({
        id,
        username,
        password,
        date: `${day}:${month}:${year}  ${date.toLocaleTimeString()}`,
      });
      createNewNotes({ id, username, notes: [] });
      setUsername("");
      setPassword("");
      setConformationPassword("");
      setErrorMessage("");
      setShowErrorMessage(false);
      toggleIsLoggedIn(true);
      updateActiveUserId(id);
      navigate("/", { replace: true, state: { prevPath: location.pathname } });
    }
  }
  function onSubmitForm(event) {
    event.preventDefault();
    if (
      username.trim() === "" &&
      password.trim() === "" &&
      conformationPassword.trim() === ""
    ) {
      setErrorMessage("enter valid input");
      setShowErrorMessage(true);
      return;
    } else if (
      (username.trim() === "" ||
        password.trim() === "" ||
        conformationPassword.trim() === "") &&
      password !== conformationPassword
    ) {
      setErrorMessage("enter valid input and password doesnt match");
      setShowErrorMessage(true);
      return;
    } else if (password !== conformationPassword) {
      setErrorMessage("password doesnt match");
      setShowErrorMessage(true);
      return;
    } else if (
      username.trim() === "" ||
      password.trim() === "" ||
      conformationPassword.trim() === ""
    ) {
      setErrorMessage("enter valid input");
      setShowErrorMessage(true);
      return;
    }
    if (
      username.trim() !== "" &&
      password.trim() !== "" &&
      conformationPassword.trim() !== "" &&
      password === conformationPassword
    ) {
      onSubmitFormDetails();
    }
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
    <div className="signup-page-main-container">
      <div>
        <div>
          <div>
            <h1>Sign up form</h1>
            <p>please fill your details</p>
          </div>

          <form onSubmit={onSubmitForm}>
            <label htmlFor="username">USERNAME</label>
            <br />
            <input
              type="text"
              onChange={onChangeUsername}
              value={username}
              id="username"
              ref={usernameRef}
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
            <label htmlFor="confirmationPassword">CONFORM PASSWORD</label>
            <br />
            <input
              type={showPassword ? "text" : "password"}
              onChange={onChangeConformationPassword}
              value={conformationPassword}
              id="confirmationPassword"
            />

            <br />
            <input
              type="checkbox"
              onChange={onChangeShowPassword}
              value={showPassword}
              checked={showPassword}
            />
            <label>show password</label>
            <br />
            <button type="submit">create account</button>
          </form>
          {showErrorMessage && <p>*{errorMessage}</p>}
        </div>
        <hr />

        <div className="sign-in-container">
          <p>already have an account?</p>
          <Link to="/login" className="sign-in-button">
            sign in{" "}
          </Link>
        </div>
      </div>
    </div>
  );
};
export default SignupPage;
