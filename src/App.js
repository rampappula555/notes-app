import "./App.css";
import { useEffect, useState } from "react";
import SignupPage from "./components/SignupPage";
import LoginPage from "./components/LoginPage";
import Home from "./components/Home";
import ProtectedRoute from "./components/ProtectedRoute";
import { Route, Routes } from "react-router-dom";
import UserDetailsContext from "./context/UserDetailsContext";
import Profile from "./components/Profile";
import Items from "./components/Items";
import EachNoteDetails from "./components/EachNoteDetails";
import ErrorBoundary from "./components/ErrorBoundary";
function App() {
  const parsedIsLoggedIn = JSON.parse(sessionStorage.getItem("is_logged_in"));
  const [isLoggedIn, setIsLoggedIn] = useState(
    parsedIsLoggedIn === null ? false : parsedIsLoggedIn
  );
  const parsedUserDetailsList = JSON.parse(
    sessionStorage.getItem("user_details_list")
  );
  const [userDetailsList, setUserDetailsList] = useState(
    parsedUserDetailsList === null ? [] : parsedUserDetailsList
  );
  const parsedActiveUserId = JSON.parse(
    sessionStorage.getItem("active_user_id")
  );
  const [activeUserId, setActiveUserId] = useState(
    parsedActiveUserId === null ? "" : parsedActiveUserId
  );
  const parsedUserNotes = JSON.parse(sessionStorage.getItem("user_notes"));
  const [userNotes, setUserNotes] = useState(
    parsedUserNotes === null ? [] : parsedUserNotes
  );
  function createNewNotes(newNotes) {
    setUserNotes((prevState) => [...prevState, newNotes]);
  }
  function updateNewNote(notesList) {
    setUserNotes([...notesList]);
  }
  function updateActiveUserId(id) {
    setActiveUserId(id);
  }
  function toggleIsLoggedIn(value) {
    setIsLoggedIn(value);
  }
  const addNewUserDetails = (newUser) => {
    setUserDetailsList((prevState) => [...prevState, newUser]);
  };
  const deleteUserDetails = (userDetails) => {
    setUserDetailsList([...userDetails]);
  };
  function updateDate(updatedList) {
    setUserDetailsList([...updatedList]);
  }
  useEffect(() => {
    sessionStorage.setItem(
      "user_details_list",
      JSON.stringify(userDetailsList)
    );
  }, [userDetailsList]);
  useEffect(() => {
    sessionStorage.setItem("is_logged_in", JSON.stringify(isLoggedIn));
  }, [isLoggedIn]);
  useEffect(() => {
    sessionStorage.setItem("user_notes", JSON.stringify(userNotes));
  }, [userNotes]);
  useEffect(() => {
    sessionStorage.setItem("active_user_id", JSON.stringify(activeUserId));
  }, [activeUserId]);
  return (
    <UserDetailsContext.Provider
      value={{
        userNotes,
        createNewNotes,
        updateDate,
        updateNewNote,
        userDetailsList,
        addNewUserDetails,
        isLoggedIn,
        toggleIsLoggedIn,
        activeUserId,
        updateActiveUserId,
        deleteUserDetails,
      }}
    >
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Home />} />
          <Route
            path="/note/:id"
            element={
              <ErrorBoundary>
                <EachNoteDetails />
              </ErrorBoundary>
            }
          />
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route path="/items/:id" element={<Items />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/sign-up" element={<SignupPage />} />
      </Routes>
    </UserDetailsContext.Provider>
  );
}

export default App;
