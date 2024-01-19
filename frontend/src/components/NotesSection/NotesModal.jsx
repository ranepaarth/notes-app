import autosize from "autosize";
import { format } from "date-fns";
import React, { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import { useNotes } from "../../hooks/useNotes";
const NotesModal = () => {
  const { user } = useAuth();
  const { handleCloseNoteModal, selectedNote, isUpdating, dispatch } =
    useNotes();
  const { register, setValue, handleSubmit } = useForm();
  const noteRef = useRef();
  const handleKeyDown = (e) => {
    e.target.style.height = "inherit";
    e.target.style.height = `${e.target.scrollHeight}px`;
  };
  useEffect(() => {
    autosize(noteRef.textarea);
  }, []);

  if (isUpdating) {
    selectedNote.title === ""
      ? setValue("title", "")
      : setValue("title", selectedNote?.title);
    selectedNote.content === ""
      ? setValue("content", "")
      : setValue("content", selectedNote?.content);
  }

  const onFormSubmit = async (data) => {
    // console.log(data);

    const reqMethod = "PATCH";
    const url = `${import.meta.env.VITE_API_URL}/api/notes/${selectedNote._id}`;
    const response = await fetch(url, {
      method: reqMethod,
      headers: {
        Authorization: `Bearer ${user?.jwt}`,
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const json = response.json();

    if (response.ok) {
      handleCloseNoteModal();
      dispatch({
        type: "UPDATE_NOTE",
        payload: {
          updatedNote: data,
          createdAt: selectedNote.createdAt,
          updatedAt: selectedNote.updatedAt,
          _id: selectedNote._id,
        },
      });
    }

    if (!response.ok) {
      console.log(json.error);
    }
  };
  return (
    <>
      {isUpdating ? (
        <>
          <button
            type="button"
            className="fixed inset-0 bg-black/50 z-10"
            onClick={handleCloseNoteModal}
            onKeyDown={handleCloseNoteModal}
            tabIndex="0"
          ></button>
          <form
            className="flex flex-col items-end justify-start top-20 left-0 right-0 md:left-[15%] md:right-[15%]  fixed z-50 bg-sky-950 border border-sky-800 rounded  mx-10 p-4 gap-y-4 pb-8"
            onSubmit={handleSubmit(onFormSubmit)}
          >
            <input
              type="text"
              className="bg-transparent p-2 pb-1 text-yellow-400 border-b w-full border-yellow-400/50 outline-none placeholder:text-yellow-400/30"
              {...register("title")}
              placeholder="Note Title..."
            />
            <textarea
              type="text"
              rows={15}
              className="edit-note text-sm font-normal bg-transparent p-2 pb-1 overflow-hidden w-full overflow-y-scroll h-fit max-h-[420px] text-yellow-400/70 border-b border-yellow-400/50 outline-none placeholder:text-yellow-400/30"
              id="content"
              ref={noteRef}
              onKeyDown={handleKeyDown}
              {...register("content")}
              placeholder="Take a Note..."
              autoFocus="autofocus"
            />
            <div className="text-xs font-medium text-yellow-400/30">
              {selectedNote.createdAt !== selectedNote.updatedAt ? (
                <span>
                  Updated:{" "}
                  {format(selectedNote.updatedAt, "EEEE do MMM yyyy hh:mm a")}
                </span>
              ) : (
                <span>
                  Created: {format(selectedNote.createdAt, "EEEE do MMM yyyy")}
                </span>
              )}
            </div>

            <button className="capitalize bg-yellow-400 font-medium px-3 py-2 rounded text-sky-900 hover:bg-opacity-60 hover:text-yellow-400 transition-colors">
              done
            </button>
          </form>
        </>
      ) : (
        ""
      )}
    </>
  );
};

export default NotesModal;
