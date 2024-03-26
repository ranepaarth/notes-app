import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { IoMdInformationCircleOutline } from "react-icons/io";
import TextAreaAutosize from "react-textarea-autosize";
import useAuth from "../../hooks/useAuth";
import { useNotes } from "../../hooks/useNotes";
import NoteModalDate from "./NoteModalDate";

const NotesModal = () => {
  const [isLoading, setIsLoading] = useState(false);

  const { user } = useAuth();
  const { selectedNote, isUpdating, dispatch, hideModal } = useNotes();
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  useEffect(() => {
    if (isUpdating) {
      setValue("title", selectedNote?.title);
      setValue("content", selectedNote?.content);
    }
  }, [isUpdating]);

  const onFormSubmit = async (data) => {
    if (data?.content === "" && data?.title === "") {
      setError("root", {
        required: {
          value: true,
          message: "Please provide at least one field.",
        },
      });
      hideModal();
    }
    setIsLoading(true);
    const url = `${import.meta.env.VITE_API_URL}/api/notes/${
      selectedNote?._id
    }`;
    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${user?.jwt}`,
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const json = response.json();
    if (response.ok) {
      setIsLoading(false);
      hideModal();
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
      setIsLoading(false);
      console.log(json.error);
    }
  };
  return (
    <>
      {isUpdating ? (
        <>
          <button
            type="button"
            className="fixed inset-0 bg-black/50 z-30"
            onClick={hideModal}
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
            <TextAreaAutosize
              type="text"
              className="note-content text-sm font-normal bg-transparent px-1 py-2 w-full text-yellow-400/70 border-b border-yellow-400/50 placeholder:text-yellow-400/30 outline-none overflow-auto resize-none"
              maxRows={15}
              minRows={1}
              id="content"
              {...register("content")}
              placeholder="Take a Note..."
              autoFocus="autofocus"
            />
            {console.log(errors)}
            {errors?.root && (
              <p className="text-red-500 text-sm w-full flex items-center gap-2">
                <span>
                  <IoMdInformationCircleOutline />
                </span>
                <span>{errors?.root?.required?.message}</span>
              </p>
            )}
            <div className="text-xs font-medium text-yellow-400/30">
              <NoteModalDate />
            </div>
            <button
              className={`capitalize bg-yellow-400 font-medium px-3 py-2 rounded text-sky-900 hover:bg-opacity-60 hover:text-yellow-400 transition-colors w-14 flex justify-center`}
            >
              {isLoading ? <span className="loader"></span> : <span>Done</span>}
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
