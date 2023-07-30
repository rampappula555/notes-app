import { useContext } from "react";
import UserDetailsContext from "../../context/UserDetailsContext";
import "./index.css";
const Header = () => {
  const value = useContext(UserDetailsContext);
  const {
    updateActiveUserId,
    toggleIsLoggedIn,
    userDetailsList,
    activeUserId,
    updateDate,
  } = value;
  function setDate() {
    const updatedUserDetailsList = userDetailsList.map((eachUser) => {
      if (eachUser.id === activeUserId) {
        const date = new Date();
        const day = ("0" + date.getDate()).slice(-2);
        const month = ("0" + (date.getMonth() + 1)).slice(-2);
        const year = date.getFullYear();

        return {
          ...eachUser,
          date: `${day}:${month}:${year}  ${date.toLocaleTimeString()}`,
        };
      }
      return eachUser;
    });
    updateDate(updatedUserDetailsList);
  }
  function onClickLogout() {
    setDate();
    updateActiveUserId("");
    toggleIsLoggedIn(false);
  }
  return (
    <div className="header-main-container">
      <button onClick={onClickLogout}>Log out</button>
    </div>
  );
};
export default Header;
