import React from "react";
import { MdDelete } from "react-icons/md";
import useAuth from "../../hooks/useAuth";
import { useNotes } from "../../hooks/useNotes";

const NoteDeleteBtn = ({ note, setIsLoading }) => {
  const { user } = useAuth();
  const { dispatch, hover, selectedNote } = useNotes();
  const deleteNote = async (note) => {
    setIsLoading(true);
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/notes/${note?._id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user?.jwt}`,
        },
      }
    );

    const json = await response.json();
    if (response.ok) {
      setIsLoading(false);
      dispatch({ type: "DELETE_NOTE", payload: json });
    }
    if (!response.ok) {
      setIsLoading(false);
    }
  };
  return (
    <button
      type="button"
      className={`text-red-700 p-1 hover:bg-red-700/30 rounded-full ${
        hover && selectedNote?._id === note?._id ? "opacity-100" : "opacity-0"
      } transition-opacity duration-200 ease-in-out`}
      onClick={() => {
        deleteNote(note);
      }}
    >
      <MdDelete />
    </button>
  );
};

export default NoteDeleteBtn;
