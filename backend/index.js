const express = require("express");
require("dotenv").config();
const notesRouter = require("./routes/notesRoute");
const mongoose = require("mongoose");
const app = express();

app.use(express.json());
app.use("/api/notes", notesRouter);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(
    app.listen(process.env.PORT, () => {
      console.log(
        `server listening on port ${process.env.PORT}\nconnected to database`
      );
    })
  )
  .catch((error) => console.log(error));
