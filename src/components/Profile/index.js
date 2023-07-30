import { useContext, useEffect, useRef, useState } from "react";
import React from "react";
import { Link, useLocation, useMatch, useNavigate } from "react-router-dom";
import UserDetailsContext from "../../context/UserDetailsContext";
import "./index.css";

const Profile = (props) => {
  const { currentPath } = props;
  const showLoggedTime = currentPath === "/";
  const location = useLocation();
  const match = useMatch("/");
  const navigate = useNavigate();
  const formWhichRoute = match === null ? location.pathname : match.pathname;
  const value = useContext(UserDetailsContext);
  const {
    userDetailsList,
    updateNewNote,
    activeUserId,
    deleteUserDetails,
    updateActiveUserId,
    toggleIsLoggedIn,
    userNotes,
  } = value;
  const activeUserDetails = userDetailsList.filter(
    (eachUser) => eachUser.id === activeUserId
  );
  const [showModal, setShowModal] = useState(false);
  const [showAccountDeletionModal, setShowAccountDeletionModal] =
    useState(false);
  const [password, setPassword] = useState("");
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const modalRef = useRef(null);
  function onChangeConformation(event) {
    setPassword(event.target.value);
  }
  function onClickYes() {
    setShowAccountDeletionModal(true);
  }
  function onClickNo() {
    setShowModal(false);
  }
  const getSessionLoggedInDetails = () => {
    if (location.state !== null) {
      if (location.state.prevPath === "/sign-up") {
        return;
      }
    }
    return <p>last logged at: {activeUserDetails[0].date}</p>;
  };
  function onClickSubmit() {
    if (activeUserDetails[0].password === password) {
      const filteredList = userDetailsList.filter(
        (eachUser) => eachUser.id !== activeUserId
      );
      deleteUserDetails(filteredList);
      const filteredNotes = userNotes.filter(
        (eachUserNotes) => eachUserNotes.id !== activeUserId
      );
      updateNewNote(filteredNotes);
      updateActiveUserId("");
      toggleIsLoggedIn(false);
      navigate("/login", { replace: true });
    } else {
      setErrorMessage("invalid password");
      setShowErrorMessage(true);
    }
  }
  useEffect(() => {
    const handler = (event) => {
      if (modalRef.current) {
        if (!modalRef.current.contains(event.target)) setShowModal(false);
      }
    };
    window.addEventListener("mousedown", handler);
  }, []);
  const renderHomeView = () => {
    return (
      <div>
        <Link to="/profile">
          <h3>{activeUserDetails[0].username}</h3>
        </Link>
        {showLoggedTime && getSessionLoggedInDetails()}
      </div>
    );
  };
  function onClickDeleteAccount() {
    setShowModal(true);
  }
  function renderProfileView() {
    return (
      <div className="profile-section-main-container">
        <h3>{activeUserDetails[0].username}</h3>
        <button onClick={onClickDeleteAccount}>delete account</button>
        {showModal && (
          <div className="delete-account-modal-background-container">
            {showAccountDeletionModal ? (
              <div ref={modalRef} className="delete-account-modal">
                <p>please enter your password to conform</p>
                <input
                  type="password"
                  onChange={onChangeConformation}
                  value={password}
                />
                <br />
                {showErrorMessage && <p>* {errorMessage}</p>}
                <button onClick={onClickSubmit}>submit</button>
              </div>
            ) : (
              <div>
                <div ref={modalRef} className="delete-account-modal">
                  <p>
                    are you sure to delete your account? this may delete your
                    notes too
                  </p>
                  <button onClick={onClickYes}>yes</button>
                  <button onClick={onClickNo}>no</button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
  switch (formWhichRoute) {
    case "/":
      return renderHomeView();
    case "/profile":
      return renderProfileView();
    default:
      return null;
  }
};
export default Profile;
