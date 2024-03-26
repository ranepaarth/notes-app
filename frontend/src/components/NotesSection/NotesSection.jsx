import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { useNotes } from "../../hooks/useNotes";
import NoteCreateBtn from "./NoteCreateBtn";
import SingleNote from "./SingleNote";

const NotesSection = () => {
  const { user } = useAuth();
  const { dispatch, notes } = useNotes();
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getNotes = async () => {
      setIsLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/notes`,
        {
          headers: {
            Authorization: `Bearer ${user?.jwt}`,
          },
        }
      );
      if (response.ok) {
        setIsLoading(false);
        const json = await response.json();
        dispatch({ type: "GET_ALL_NOTES", payload: json });
        setError(false);
      }
      if (!response.ok) {
        console.log(json.error);
      }
    };

    if (user) getNotes();
  }, [user]);

  return (
    <>
      <div className="flex justify-center items-center">
        {isLoading ? <span className="loader"></span> : ""}
      </div>
      <span>{error ? "Oops Something went wrong" : ""}</span>
      <section className="my-5 max-sm:w-full sm:w-fit max-sm:flex max-sm:flex-wrap max-sm:items-start max-sm:justify-start mx-auto max-md:columns-2 space-y-3 md:columns-3 lg:columns-4 xl:columns-5 transition-transform cursor-default">
        {user &&
          notes?.map((note) => (
            <SingleNote
              note={note}
              key={note?._id}
              setIsLoading={setIsLoading}
            />
          ))}
      </section>
      <NoteCreateBtn />
    </>
  );
};

export default NotesSection;
