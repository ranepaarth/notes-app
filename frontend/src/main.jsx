import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import NotesContextProvider from "./context/NotesContext.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <NotesContextProvider>
    <App />
  </NotesContextProvider>
);
