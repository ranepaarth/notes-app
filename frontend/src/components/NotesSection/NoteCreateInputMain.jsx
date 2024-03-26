import React from "react";
import { useForm } from "react-hook-form";
import TextAreaAutosize from "react-textarea-autosize";
import useAuth from "../../hooks/useAuth";
import { useNotes } from "../../hooks/useNotes";

const NoteCreateInputMain = ({ setIsLoading, setServerError }) => {
  const { register, handleSubmit, reset } = useForm();
  const { user } = useAuth();
  const { toggleShowMainInput, dispatch } = useNotes();

  const onFormSubmit = async (data) => {
    if (data.title === "" && data.content === "") {
      toggleShowMainInput();
      return;
    }
    setIsLoading(true);
    setServerError(false);

    const url = `${import.meta.env.VITE_API_URL}/api/notes`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${user?.jwt}`,
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const json = await response.json();
    if (response.ok) {
      toggleShowMainInput();
      setIsLoading(false);
      dispatch({ type: "CREATE_NEW_NOTE", payload: json });
    }
    if (!response.ok) {
      setIsLoading(false);
      console.log(json.error);
      setServerError(json.error);
      toggleShowMainInput();
    }
    reset();
  };

  const closeTextInputArea = () => {
    reset();
    toggleShowMainInput();
  };

  return (
    <form
      className="p-2 bg-sky-950/20 rounded w-full max-w-[600px] border border-sky-950/30 shadow-xl"
      onSubmit={handleSubmit(onFormSubmit)}
    >
      <input
        type="text"
        id="title"
        placeholder="Title"
        className="w-full p-1 bg-transparent placeholder:text-yellow-200/50 outline-none border-none text-sky-950 mb-2 font-medium"
        {...register("title")}
      />
      <TextAreaAutosize
        type="text"
        maxRows={10}
        minRows={2}
        id="textarea"
        placeholder="Take a note..."
        className="note-content w-full px-1 py-2 outline-none border-none bg-transparent text-sm h-fit placeholder:text-yellow-200/50 text-sky-950 resize-none font-poppins"
        {...register("content")}
        autoFocus="autofocus"
      />

      <div className="flex items-center gap-2 justify-end">
        <button
          type="submit"
          className="text-sm p-1 hover:bg-sky-900 rounded text-yellow-200 outline-none border focus:bg-sky-900 border-sky-900 ease-in-out duration-200"
        >
          Create Note
        </button>
        <button
          type="button"
          className="text-sm p-1 hover:bg-sky-900 rounded text-yellow-200 outline-none border focus:bg-sky-900 border-sky-900 ease-in-out duration-200"
          onClick={closeTextInputArea}
        >
          Dismiss
        </button>
      </div>
    </form>
  );
};

export default NoteCreateInputMain;
