import React from "react";
import NotesInput from "../components/NotesSection/NotesInput";
import NotesModal from "../components/NotesSection/NotesModal";
import NotesSection from "../components/NotesSection/NotesSection";
const NotesPage = () => {
  return (
    <>
      <NotesModal />
      <NotesInput />
      <NotesSection />
    </>
  );
};

export default NotesPage;
