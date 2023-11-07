const express = require("express");
const bodyParser = require("body-parser");
const dbConfig = require("./config/database.config.js");
const mongoose = require("mongoose");
const UserRoute  = require("./routes/User.js");

mongoose.Promise = global.Promise;

mongoose
  .connect(dbConfig.url, {
    //this is needed for some reason
    family: 4,
  })
  .then(() => {
    console.log("database connected successfully!");
  })
  .catch((err) => {
    console.log("database connected error:", err);
    process.exit();
  });

const app = express();

app.use("/user", UserRoute);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.json({ message: "Hello CRUD EXAMPLE" });
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
