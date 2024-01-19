const express = require("express");
require("dotenv").config();
const notesRouter = require("./routes/notesRoute");
const usersRouter = require("./routes/usersRoute");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin",
    process.env.CLIENT_URL);

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  // Pass to next layer of middleware
  next();
});
app.options('*', cors())
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
