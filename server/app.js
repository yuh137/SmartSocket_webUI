const express = require("express");
const cors = require("cors");
const app = express();
const port = 8000;

app.use(cors());
app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const publishRoute = require('./routes/publish');

app.use('/publish', publishRoute);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
  