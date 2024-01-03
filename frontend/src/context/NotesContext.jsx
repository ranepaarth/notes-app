import { createContext, useReducer, useState } from "react";

export const NotesContext = createContext();

const notesReducer = (state, action) => {
  switch (action.type) {
    case "GET_ALL_NOTES":
      return {
        notes: action.payload,
      };
    case "CREATE_NEW_NOTE":
      return {
        notes: [action.payload, ...state.notes],
      };
    case "DELETE_NOTE":
      return {
        notes: state.notes.filter((note) => note._id !== action.payload._id),
      };
    case "UPDATE_NOTE":
      const { updatedNote, createdAt, updatedAt, _id } = action.payload;
      // console.log(updatedNote, createdAt, updatedAt, _id);
      return {
        notes: state.notes.map((note) =>
          note._id === _id
            ? {
                title: updatedNote.title,
                content: updatedNote.content,
                createdAt,
                updatedAt,
                _id,
              }
            : note
        ),
      };

    default:
      return state;
  }
};

const notesState = {
  notes: null,
};
const NotesContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(notesReducer, notesState);
  const [showModal, setShowModal] = useState(false);
  const [hover, setHover] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);
  const [showTitle, setShowTitle] = useState(false);

  const toggleMainInput = () => {
    setShowTitle((prev) => !prev);
  };
  const handleNoteClick = () => {
    setShowModal(true);
    setIsUpdating(true);
  };

  const handleCloseNoteModal = () => {
    setShowModal(false);
    setIsUpdating(false);
  };

  const mouseEnterHandle = (note) => {
    setSelectedNote(note);
    setHover(true);
  };
  const mouseLeaveHandle = () => {
    setHover(false);
  };

  return (
    <NotesContext.Provider
      value={{
        ...state,
        dispatch,
        showModal,
        setShowModal,
        handleNoteClick,
        handleCloseNoteModal,
        mouseEnterHandle,
        mouseLeaveHandle,
        hover,
        selectedNote,
        isUpdating,
        toggleMainInput,
        showTitle,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
};

export default NotesContextProvider;
