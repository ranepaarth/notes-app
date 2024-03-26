import { createContext, useReducer } from "react";

export const NotesContext = createContext();

const notesReducer = (state, action) => {
  switch (action.type) {
    case "GET_ALL_NOTES":
      return {
        ...state,
        notes: action.payload,
      };
    case "CREATE_NEW_NOTE":
      return {
        ...state,
        notes: [action.payload, ...state.notes],
      };
    case "DELETE_NOTE":
      return {
        ...state,
        notes: state.notes.filter((note) => note._id !== action.payload._id),
      };
    case "UPDATE_NOTE":
      const { updatedNote, createdAt, updatedAt, _id } = action.payload;
      return {
        ...state,
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
    case "TOGGLE_SHOW_MAIN_INPUT":
      return {
        ...state,
        showMainInput: !state.showMainInput,
      };
    case "MOUSE_ENTER":
      const { selectedNote, isMouseEnter } = action.payload;
      return {
        ...state,
        selectedNote: selectedNote,
        hover: isMouseEnter,
      };
    case "MOUSE_LEAVE":
      return {
        ...state,
        hover: action.payload,
      };
    case "SHOW_MODAL":
      return {
        ...state,
        showModal: true,
        isUpdating: true,
      };
    case "SELECTED_NOTE":
      return {
        ...state,
        selectedNote: action.payload,
      };
    case "HIDE_MODAL":
      return {
        ...state,
        showModal: false,
        isUpdating: false,
      };
    case "EDIT_TWEET":
      return {
        ...state,
        showModal: true,
        isUpdating: true,
      };

    default:
      return state;
  }
};

const notesState = {
  notes: [],
  selectedNote: null,
  hover: false,
  showModal: false,
  isUpdating: false,
  showMainInput: false,
};

const NotesContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(notesReducer, notesState);

  const toggleShowMainInput = () => {
    dispatch({ type: "TOGGLE_SHOW_MAIN_INPUT" });
  };

  const onMouseEnterHandler = (selectedNote) => {
    dispatch({
      type: "MOUSE_ENTER",
      payload: { selectedNote, isMouseEnter: true },
    });
  };

  const onMouseLeaveHandler = () => {
    dispatch({ type: "MOUSE_LEAVE", payload: false });
  };

  const toggleShowModal = () => {
    console.log("clicked");
    dispatch({ type: "SHOW_MODAL" });
  };

  const hideModal = () => {
    dispatch({ type: "HIDE_MODAL" });
  };

  const startEditTweet = () => {
    console.log("edit tweet");
    dispatch({ type: "EDIT_TWEET" });
  };

  return (
    <NotesContext.Provider
      value={{
        ...state,
        dispatch,
        toggleShowMainInput,
        onMouseEnterHandler,
        onMouseLeaveHandler,
        toggleShowModal,
        hideModal,
        startEditTweet,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
};

export default NotesContextProvider;
