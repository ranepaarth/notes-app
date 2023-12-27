const express = require("express");
require("dotenv").config();
const notesRouter = require("./routes/notesRoute");
const usersRouter = require("./routes/usersRoute");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/notes", notesRouter);
app.use("/api/users", usersRouter);

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
