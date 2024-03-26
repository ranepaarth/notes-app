import { format } from "date-fns";
import React from "react";
import { useNotes } from "../../hooks/useNotes";

const NoteModalDate = () => {
  const { selectedNote } = useNotes();
  return selectedNote?.createdAt !== selectedNote?.updatedAt ? (
    <span>
      Updated: {format(selectedNote?.updatedAt, "EEEE do MMM yyyy hh:mm a")}
    </span>
  ) : (
    <span>Created: {format(selectedNote?.createdAt, "EEEE do MMM yyyy")}</span>
  );
};

export default NoteModalDate;
