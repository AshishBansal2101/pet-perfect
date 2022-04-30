const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const path = require("path");
const dotenv = require("dotenv");
var faker = require("faker");
var fakerModel = require("./models/authorModel");

dotenv.config({ path: process.cwd() + "/config/config.env" });

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

//Route imports
const book = require("./routes/bookRoute");
const author = require("./routes/authorRoute");

app.use("/api/v1", book);
app.use("/api/v1", author);

//sample data----faker
for (var i = 0; i < 10; i++) {
  var fakke = new fakerModel({
    name: faker.name.firstName(),
    email: faker.internet.email(),
    phone: faker.phone.phoneNumber(),
    password: "12345678",
  });
  fakke.save((err, data) => {
    if (err) {
      console.log("error occured", err);
    }
  });
}

module.exports = app;
