import autosize from "autosize";
import React, { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { useNotes } from "../../hooks/useNotes";

const NotesInput = () => {
  const { showTitle, toggleMainInput, dispatch } = useNotes();
  const { register, handleSubmit, reset } = useForm();
  const noteRef = useRef();
  const handleKeyDown = (e) => {
    e.target.style.height = "inherit";
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  useEffect(() => {
    autosize(noteRef.textarea);
  }, []);

  const onFormSubmit = async (data) => {
    console.log(data);
    if (data.title === "" && data.content === "") {
      toggleMainInput();
      return;
    }
    const reqMethod = "POST";
    const url = "http://localhost:4000/api/notes";
    const response = await fetch(url, {
      method: reqMethod,
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const json = await response.json();

    if (response.ok) {
      toggleMainInput();
      console.log(json);
      dispatch({ type: "CREATE_NEW_NOTE", payload: json });
    }
    if (!response.ok) console.log(json.error);
    reset();
  };
  console.log("first");
  return (
    <div className="flex justify-center px-8 py-10">
      {showTitle ? (
        <form
          className="p-2 bg-sky-950/20 rounded w-full max-w-[600px] border border-sky-950/30 shadow-xl"
          onSubmit={handleSubmit(onFormSubmit)}
        >
          <input
            type="text"
            id="title"
            placeholder="Title"
            className="w-full p-1 bg-transparent placeholder:text-yellow-200/50 outline-none border-none text-yellow-200 mb-2"
            {...register("title")}
          />
          <br></br>
          <pre>
            <textarea
              type="text"
              rows={1}
              id="textarea"
              placeholder="Take a note..."
              className="w-full px-1 py-2 outline-none border-none bg-transparent text-sm placeholder:text-yellow-200/50 text-yellow-200 resize-none overflow-hidden font-poppins"
              onKeyDown={handleKeyDown}
              {...register("content")}
              autoFocus="autofocus"
            />
          </pre>
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
              onClick={toggleMainInput}
            >
              Dismiss
            </button>
          </div>
        </form>
      ) : (
        <input
          type="text"
          id="smallInput"
          className="p-2 rounded shadow-xl border border-sky-950/30 bg-sky-950/20 text-yellow-200 w-full max-w-[600px] placeholder:text-yellow-200/50 outline-none"
          placeholder="Take a note..."
          autoFocus="autofocus"
          ref={noteRef}
          onClick={toggleMainInput}
          onKeyDown={toggleMainInput}
        />
      )}
    </div>
  );
};

export default NotesInput;
