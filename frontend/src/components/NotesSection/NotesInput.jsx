import React, { useState } from "react";
import { useNotes } from "../../hooks/useNotes";
import NoteCreateInputMain from "./NoteCreateInputMain";
import ServerError from "./ServerError";
import UserName from "./UserName";

const NotesInput = () => {
  const { showMainInput, toggleShowMainInput } = useNotes();
  const [serverError, setServerError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <div className="flex flex-col justify-center px-8 py-5 w-full max-w-[600px]">
        <UserName />

        {showMainInput ? (
          <NoteCreateInputMain
            setIsLoading={setIsLoading}
            setServerError={setServerError}
          />
        ) : (
          <input
            type="text"
            id="smallInput"
            className="p-2 rounded shadow-xl border border-sky-950/30 bg-sky-950/20 text-yellow-200 w-full max-w-[600px] placeholder:text-yellow-200/50 outline-none caret-sky-950"
            placeholder="Take a note..."
            autoFocus="autofocus"
            onClick={toggleShowMainInput}
          />
        )}
      </div>
      <ServerError serverError={serverError} />
      <span>{isLoading ? <span className="loader"></span> : ""}</span>
    </div>
  );
};

export default NotesInput;
