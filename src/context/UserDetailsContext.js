import React from "react";
const UserDetailsContext = React.createContext({
  userDetailsList: [],
  addNewUserDetails: () => {},
  deleteUserDetails: () => {},
  updateDate: () => {},
  isLoggedIn: false,
  toggleIsLoggedIn: () => {},
  activeUserId: "",
  updateActiveUserId: () => {},
  userNotes: [],
  createNewNotes: () => {},
  updateNewNote: () => {},
});
export default UserDetailsContext;
