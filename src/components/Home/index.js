import "./index.css";
import { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Profile from "../Profile";
import Header from "../Header";
import UserDetailsContext from "../../context/UserDetailsContext";
import { v4 as uuidv4 } from "uuid";
const Home = () => {
  const value = useContext(UserDetailsContext);
  const { userNotes, activeUserId, updateNewNote } = value;
  const activeUserNotes = userNotes.filter(
    (eachNote) => eachNote.id === activeUserId
  );
  const location = useLocation();
  console.log(location);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [notes, setNotes] = useState("");
  const [showDeleteButton, setShowDeleteButton] = useState(false);
  const [showLockModal, setShowLockModal] = useState(false);
  const [lockPassword, setLockPassword] = useState("");
  const [lockNoteId, setLockNoteId] = useState("");
  const [showUnlockModal, setShowUnLockModal] = useState(false);
  const [unlockPassword, setUnlockPassword] = useState("");
  const [unlockNoteId, setUnlockNoteId] = useState("");
  function onChangeUnlockPassword(event) {
    setUnlockPassword(event.target.value);
  }
  function onChangeLockPassword(event) {
    setLockPassword(event.target.value);
  }
  function onClickSelectButton() {
    setShowDeleteButton((prevState) => !prevState);
  }
  function onClickDeleteSelected() {
    const filteredNotes = userNotes.map((eachUserNote) => {
      if (eachUserNote.id === activeUserId) {
        return {
          ...eachUserNote,
          notes: eachUserNote.notes.filter(
            (eachNote) => eachNote.isChecked === false
          ),
        };
      }
      return eachUserNote;
    });
    updateNewNote(filteredNotes);
    setShowDeleteButton((prevState) => !prevState);
  }
  function onChangeNotes(event) {
    setNotes(event.target.value);
  }
  function setTimer() {
    setShowSuccessMessage(true);
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 5000);
  }
  function onClickSaveButton() {
    if (notes.trim() !== "") {
      const updatedNotes = userNotes.map((eachUserNote) => {
        if (eachUserNote.id === activeUserId) {
          return {
            ...eachUserNote,
            notes: [
              ...eachUserNote.notes,
              {
                id: uuidv4(),
                note: notes,
                isChecked: false,
                isPinned: false,
                isLocked: false,
                lockPassword: "",
                dateTime: new Date(),
              },
            ].sort((a, b) => new Date(b.dateTime) - new Date(a.dateTime)),
          };
        }
        return eachUserNote;
      });
      updateNewNote(updatedNotes);
      setNotes("");
    }
  }
  useEffect(() => {
    if (location?.state?.prevPath === "/sign-up") {
      setTimer();
    }
  }, [location]);
  function onChangeCheckbox(event, id) {
    const activeUserNotesList = userNotes.map((eachUsernote) => {
      if (eachUsernote.id === activeUserId) {
        return {
          ...eachUsernote,
          notes: eachUsernote.notes.map((eachNote) => {
            if (eachNote.id === id) {
              return { ...eachNote, isChecked: event.target.checked };
            }
            return eachNote;
          }),
        };
      }
      return eachUsernote;
    });
    updateNewNote(activeUserNotesList);
  }
  function onClickPin(id) {
    const activeUserNotesList = userNotes.map((eachUsernote) => {
      if (eachUsernote.id === activeUserId) {
        return {
          ...eachUsernote,
          notes: eachUsernote.notes.map((eachNote) => {
            if (eachNote.id === id) {
              return { ...eachNote, isPinned: true };
            }
            return eachNote;
          }),
        };
      }
      return eachUsernote;
    });
    updateNewNote(activeUserNotesList);
  }
  function onClickUnPin(id) {
    const activeUserNotesList = userNotes.map((eachUsernote) => {
      if (eachUsernote.id === activeUserId) {
        return {
          ...eachUsernote,
          notes: eachUsernote.notes.map((eachNote) => {
            if (eachNote.id === id) {
              return { ...eachNote, isPinned: false };
            }
            return eachNote;
          }),
        };
      }
      return eachUsernote;
    });
    updateNewNote(activeUserNotesList);
  }
  function onClickLock(id) {
    setLockNoteId(id);
    setShowLockModal(true);
  }
  function onClickConformLock() {
    if (lockPassword.trim() === "") {
      return;
    }
    const activeUserNotesList = userNotes.map((eachUsernote) => {
      if (eachUsernote.id === activeUserId) {
        return {
          ...eachUsernote,
          notes: eachUsernote.notes.map((eachNote) => {
            if (eachNote.id === lockNoteId) {
              return { ...eachNote, isLocked: true, lockPassword };
            }
            return eachNote;
          }),
        };
      }
      return eachUsernote;
    });
    updateNewNote(activeUserNotesList);
    setShowLockModal(false);
    setLockPassword("");
    setLockNoteId("");
  }
  function onClickUnlock(id) {
    setUnlockNoteId(id);
    setShowUnLockModal(true);
  }
  function onClickConformUnlock() {
    if (unlockPassword.trim() === "") {
      return;
    }
    const activeUserNotesList = userNotes.map((eachUsernote) => {
      if (eachUsernote.id === activeUserId) {
        return {
          ...eachUsernote,
          notes: eachUsernote.notes.map((eachNote) => {
            if (
              eachNote.id === unlockNoteId &&
              unlockPassword === eachNote.lockPassword
            ) {
              setShowUnLockModal(false);
              setUnlockPassword("");
              setUnlockNoteId("");
              return { ...eachNote, isLocked: false, lockPassword: "" };
            }
            return eachNote;
          }),
        };
      }
      return eachUsernote;
    });
    updateNewNote(activeUserNotesList);
  }
  useEffect(() => {
    const body = document.querySelector("body");
    if (showLockModal) {
      body.style.overflow = "hidden";
    } else {
      body.style.overflow = "initial";
    }
  }, [showLockModal]);
  return (
    <div className="home-page-main-container">
      <Header />
      <div className="home-and-profile-container">
        <div className="home-page-container">
          {activeUserNotes[0].notes.length > 0 ? (
            <div>
              <div>
                {showDeleteButton ? (
                  <button onClick={onClickDeleteSelected}>
                    delete selected
                  </button>
                ) : (
                  <button onClick={onClickSelectButton}>select</button>
                )}
              </div>
              <div>
                {activeUserNotes[0].notes.map((eachNote) => {
                  const { id, note, isChecked, isPinned, isLocked } = eachNote;
                  return (
                    <div key={id}>
                      {isPinned && (
                        <div
                          style={{
                            marginBottom: "25px",
                            paddingLeft: "10px",
                            paddingRight: "20px",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                            }}
                          >
                            <Link
                              to={`/note/${id}`}
                              style={{
                                display: "inline",
                                textDecoration: "none",
                                color: "black",
                              }}
                            >
                              {note.slice(0, 3)}...
                            </Link>
                            <div>
                              <div>
                                {isLocked && <p>locked</p>}
                                <button
                                  onClick={() => {
                                    onClickUnPin(id);
                                  }}
                                >
                                  Unpin
                                </button>
                                <button
                                  onClick={() => {
                                    isLocked
                                      ? onClickUnlock(id)
                                      : onClickLock(id);
                                  }}
                                >
                                  {isLocked ? "unlock" : "lock"}
                                </button>
                              </div>
                              {showDeleteButton && (
                                <div>
                                  <input
                                    id={id}
                                    type="checkbox"
                                    checked={isChecked}
                                    onChange={(event) =>
                                      onChangeCheckbox(event, id)
                                    }
                                  />
                                  <label htmlFor={id}>select</label>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
                <hr />
              </div>
              {activeUserNotes[0].notes.map((eachNote) => {
                const { id, note, isChecked, isPinned, isLocked } = eachNote;
                return (
                  <div key={id}>
                    {!isPinned && (
                      <div
                        style={{
                          marginBottom: "10px",
                          paddingLeft: "10px",
                          paddingRight: "20px",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                          }}
                        >
                          <Link
                            to={`/note/${id}`}
                            style={{
                              display: "inline",
                              textDecoration: "none",
                              color: "black",
                            }}
                          >
                            {note.slice(0, 3)}....
                          </Link>
                          <div>
                            {isLocked && <p>locked</p>}
                            <button
                              onClick={() => {
                                onClickPin(id);
                              }}
                            >
                              pin
                            </button>
                            <button
                              onClick={() => {
                                isLocked ? onClickUnlock(id) : onClickLock(id);
                              }}
                            >
                              {isLocked ? "unlock" : "lock"}
                            </button>
                          </div>
                        </div>
                        {showDeleteButton && (
                          <div>
                            <input
                              id={id}
                              type="checkbox"
                              checked={isChecked}
                              onChange={(event) => onChangeCheckbox(event, id)}
                            />
                            <label htmlFor={id}>select</label>
                          </div>
                        )}
                        <hr />
                      </div>
                    )}
                  </div>
                );
              })}
              <textarea value={notes} onChange={onChangeNotes}></textarea>
              <button onClick={onClickSaveButton}>save</button>
            </div>
          ) : (
            <div>
              <p>no notes available create new notes</p>
              <textarea value={notes} onChange={onChangeNotes}></textarea>
              <button onClick={onClickSaveButton}>save</button>
            </div>
          )}
        </div>
        <div className="profile-page-container">
          <Profile currentPath={location.pathname} />
        </div>
      </div>
      <div className="account-creation-success-notification">
        {showSuccessMessage && <p>Account created successfully</p>}
      </div>
      <div>
        {showLockModal && (
          <div className="delete-account-modal-background-container">
            <label htmlFor="setPassword">set password</label>
            <input
              type="password"
              id="setPassword"
              value={lockPassword}
              onChange={onChangeLockPassword}
            />
            <div>
              <button onClick={onClickConformLock}>lock</button>
            </div>
          </div>
        )}
      </div>
      <div>
        {showUnlockModal && (
          <div className="delete-account-modal-background-container">
            <input
              type="password"
              onChange={onChangeUnlockPassword}
              value={unlockPassword}
            />
            <button onClick={onClickConformUnlock}>unlock</button>
          </div>
        )}
      </div>
    </div>
  );
};
export default Home;
