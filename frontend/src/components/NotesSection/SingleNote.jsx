import { format } from "date-fns";
import React from "react";
import TextAreaAutosize from "react-textarea-autosize";
import { useNotes } from "../../hooks/useNotes";
import NoteDeleteBtn from "./NoteDeleteBtn";

const SingleNote = ({ note, setIsLoading }) => {
  const { onMouseEnterHandler, onMouseLeaveHandler, startEditTweet } =
    useNotes();

  return (
    <article
      type="button"
      className="bg-sky-950/30 border border-sky-950/30 hover:shadow-lg rounded p-2 px-4 hover:shadow-yellow-950/30 transition-transform ease-out duration-200 flex flex-col max-sm:w-full max-md:w-[220px] md:w-[220px] h-fit md:max-h-[370px] overflow-hidden relative"
      key={note?._id}
      onMouseEnter={() => onMouseEnterHandler(note)}
      onMouseLeave={onMouseLeaveHandler}
    >
      <div className="" onClick={() => startEditTweet(note)}>
        <span className="text-sky-950 font-medium max-sm:text-lg max-md:text-base md:text-base">
          {note?.title}
        </span>
        <TextAreaAutosize
          value={note?.content}
          maxRows={16}
          minRows={1}
          className="bg-transparent outline-none w-full text-sky-950 max-sm:text-base max-md:text-sm md:text-sm resize-none overflow-hidden cursor-pointer"
          onClick={() => startEditTweet(note)}
        />
      </div>
      <div className="flex items-center justify-between">
        <span className="text-lg">
          <NoteDeleteBtn note={note} setIsLoading={setIsLoading} />
        </span>
        <p className="text-xs text-end text-sky-950/50">
          {format(note?.createdAt, "EEEE, do MMMM")}
        </p>
      </div>
    </article>
  );
};

export default SingleNote;
