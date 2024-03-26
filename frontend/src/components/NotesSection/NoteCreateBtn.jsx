import React from "react";
import { FaPlus } from "react-icons/fa6";
import { useNotes } from "../../hooks/useNotes";

const NoteCreateBtn = () => {
  const { toggleShowMainInput, showMainInput } = useNotes();
  return (
    <button
      type="button"
      className="z-10 bg-yellow-600 p-2 border border-sky-950/30 rounded-full hover:shadow-lg hover:shadow-yellow-950 font-semibold text-yellow-950 fixed bottom-10 right-10 text-3xl"
      onClick={toggleShowMainInput}
    >
      <span>
        <FaPlus
          className={`${
            showMainInput ? "rotate-45" : ""
          } transform transition-transform ease-in-out duration-300`}
        />
      </span>
    </button>
  );
};

export default NoteCreateBtn;
