import { useContext } from "react";
import { NotesContext } from "../context/NotesContext";

export const useNotes = () => {
  const context = useContext(NotesContext);

  if (!context) {
    console.log("useNotes must be used inside NotesContextProvider");
    return;
  }

  return context;
};
