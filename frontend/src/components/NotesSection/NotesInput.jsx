import autosize from "autosize";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useNotes } from "../../hooks/useNotes";

const NotesInput = () => {
  const { user } = useAuth();
  const { showTitle, toggleMainInput, dispatch, notes } = useNotes();
  const { register, handleSubmit, reset } = useForm();
  const [serverError, setServerError] = useState(null);
  const noteRef = useRef();
  const handleKeyDown = (e) => {
    e.target.style.height = "inherit";
    e.target.style.height = `${e.target.scrollHeight}px`;
    e.target.style.maxHeight = "250px";
  };

  useEffect(() => {
    autosize(noteRef.textarea);
  }, []);

  const onFormSubmit = async (data) => {
    // console.log(data);
    if (data.title === "" && data.content === "") {
      toggleMainInput();
      return;
    }
    const reqMethod = "POST";
    const url = `${import.meta.env.VITE_API_URL}/api/notes`;
    const response = await fetch(url, {
      method: reqMethod,
      headers: {
        Authorization: `Bearer ${user?.jwt}`,
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const json = await response.json();

    if (response.ok) {
      toggleMainInput();
      setServerError(null);
      // console.log(json);
      dispatch({ type: "CREATE_NEW_NOTE", payload: json });
    }
    if (!response.ok) {
      setServerError(json.error);
      toggleMainInput();
      // console.log(json.error);
    }
    reset();
  };
  return (
    <div className="w-full flex flex-col items-center justify-center">
      <div className="flex flex-col justify-center px-8 py-8 w-full max-w-[600px]">
        {user ? (
          <h3 className="text-center mb-2 flex justify-center items-baseline gap-1">
            <span className="font-medium text-yellow-950/70 text-xl">
              Hello
            </span>
            <span className="font-semibold text-2xl text-yellow-950/90">
              {user?.userName}
            </span>
          </h3>
        ) : (
          ""
        )}
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
                className="edit-note w-full px-1 py-2 outline-none border-none bg-transparent text-sm placeholder:text-yellow-200/50 text-yellow-200 resize-none overflow-auto font-poppins"
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
      {(!user || (serverError && notes?.length !== 0)) && (
        <div className="flex items-center justify-center">
          <span className="text-center bg-red-500/30 px-4 py-2 rounded text-red-700 border border-red-500">
            <p className=" text-xl font-medium my-1">
              {serverError || "Oops!! Seems like you are not logged in."}
            </p>
            <p className="text-sm">
              Have an account?
              <NavLink
                className="px-1 font-semibold text-base hover:underline"
                to="/signin"
              >
                Log in
              </NavLink>
            </p>
            <p className="text-lg">OR</p>
            <p>
              <NavLink
                className="px-1 font-semibold text-base hover:underline"
                to="/signup"
              >
                Create new account
              </NavLink>
            </p>
          </span>
        </div>
      )}
    </div>
  );
};

export default NotesInput;
