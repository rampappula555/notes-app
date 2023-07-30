import { useContext, useState } from "react";
import { useMatch } from "react-router-dom";
import UserDetailsContext from "../../context/UserDetailsContext";

function EachNoteDetails() {
  const [password, setPassword] = useState("");
  const value = useContext(UserDetailsContext);
  const { activeUserId, userNotes } = value;

  const match = useMatch("/note/:id");
  const { params } = match;
  const { id } = params;
  const filteredActiveUser = userNotes.find(
    (eachUserNote) => eachUserNote.id === activeUserId
  );
  const filteredNotes = filteredActiveUser.notes.find(
    (eachNote) => eachNote.id === id
  );

  const { isLocked, note, lockPassword } = filteredNotes || {};
  const [showNote, setShowNote] = useState(isLocked);
  function onChangePassword(event) {
    setPassword(event.target.value);
  }
  function onClickConform() {
    if (password.trim() === "") {
      return;
    }
    if (lockPassword === password) {
      setShowNote(false);
    }
  }
  return (
    <div>
      {filteredNotes ? (
        <div>
          {showNote ? (
            <div
              className="delete-account-modal-background-container"
              style={{ textAlign: "center" }}
            >
              <div>
                <h2>Locked Note</h2>

                <p>please enter your password to unlock</p>

                <input
                  type="password"
                  value={password}
                  onChange={onChangePassword}
                />
                <button onClick={onClickConform}>conform</button>
              </div>
            </div>
          ) : (
            <div>{note}</div>
          )}
        </div>
      ) : (
        <h1>Notes not found</h1>
      )}
    </div>
  );
}
export default EachNoteDetails;
