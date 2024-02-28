import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import useAuth from "../../hooks/useAuth";
import { useNotes } from "../../hooks/useNotes";

const NotesSection = () => {
  const { user } = useAuth();

  const {
    hover,
    dispatch,
    notes,
    mouseLeaveHandle,
    mouseEnterHandle,
    handleNoteClick,
    selectedNote,
    toggleMainInput,
  } = useNotes();

  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getNotes = async () => {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/notes`,
        {
          headers: {
            Authorization: `Bearer ${user?.jwt}`,
          },
        }
      );
      if (response.ok) {
        const json = await response.json();
        dispatch({ type: "GET_ALL_NOTES", payload: json });
        setError(false);
      }

      if (!response.ok) {
        // setError(json.error);
        console.log(json.error);
      }
    };
    console.log("outside");
    if (user) getNotes();
  }, [user]);

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
      // console.log(json.error);
    }
  };

  return (
    <>
      <button
        type="button"
        className="bg-sky-950/30 p-2 border border-sky-950/30 rounded-full hover:shadow-lg hover:shadow-yellow-950 font-semibold text-sky-950 fixed bottom-10 right-10 text-3xl"
        onClick={toggleMainInput}
      >
        <FaPlus />
      </button>
      <div className="flex justify-center items-center">
        {isLoading ? <span className="loader"></span> : ""}
      </div>
      <span>{error ? "Oops Something went wrong" : ""}</span>
      <section className="my-5 max-sm:w-full sm:w-fit max-sm:flex max-sm:flex-wrap max-sm:items-start max-sm:justify-start mx-auto max-md:columns-2 space-y-3 md:columns-3 lg:columns-4 xl:columns-5 transition-transform cursor-default">
        {user &&
          notes &&
          notes.map((note) => (
            <article
              type="button"
              className="bg-sky-950/30 border border-sky-950/30 hover:shadow-lg rounded p-2 px-4 hover:shadow-yellow-950/30 transition-transform ease-out duration-200 flex flex-col max-sm:w-full max-md:w-[220px] md:w-[220px] h-fit md:max-h-[370px] overflow-hidden relative"
              key={note?._id}
              onMouseEnter={() => mouseEnterHandle(note)}
              onMouseLeave={mouseLeaveHandle}
            >
              <div
                className=""
                onClick={handleNoteClick}
                onKeyDown={handleNoteClick}
              >
                <span className="text-sky-950 font-medium max-sm:text-lg max-md:text-base md:text-base">
                  {note?.title}
                </span>
                <p className="text-sky-950/75 max-sm:text-base max-md:text-sm md:text-sm max-sm:line-clamp-[28] max-md:line-clamp-[16] md:line-clamp-[16] mt-1">
                  {note?.content}
                </p>
              </div>
              <div className="flex items-center justify-between">
                <span
                  className={`flex gap-2 items-center justify-between transition-opacity duration-200 mt-2 text-lg z-0`}
                >
                  <button
                    type="button"
                    className={`text-red-700 p-1 hover:bg-red-700/30 rounded-full ${
                      hover && selectedNote._id === note?._id
                        ? "opacity-100"
                        : "opacity-0"
                    }`}
                    onClick={() => {
                      deleteNote(note);
                    }}
                  >
                    <MdDelete />
                  </button>
                </span>
                <p className="text-xs text-end text-sky-950/50 mt-2">
                  {format(note?.createdAt, "EEEE, do MMMM")}
                </p>
              </div>
            </article>
          ))}
      </section>
    </>
  );
};

export default NotesSection;
