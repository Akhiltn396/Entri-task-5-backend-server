const express = require("express");
const bcrypt = require("bcryptjs");
var path = require("path");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();

const app = express();
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

const users = [
  {
    username: "akhil",
    email: "akhil@gmail.com",
    password: "123",
  },
];

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {

    if (password != users[0].password) {
      res.json("Invalid login credentials");
    }
    const token = jwt.sign(
      {
        username: username,
      },
      process.env.JWT_KEY
    );

    const verified = jwt.verify(token, process.env.JWT_KEY);
    if (verified) {
      res.redirect("/profile");
    } else {
      res.redirect("/login").send("Invalid token");
    }
  } catch (error) {
    console.log(error);
  }
});

app.get("/register", (req, res) => {
  res.sendFile(__dirname + "/public/views/auth/register.html");
});
app.get("/login", (req, res) => {
  res.sendFile(__dirname + "/public/views/auth/login.html");
});

app.get("/profile", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

app.listen(3008, () => {
  console.log("Server started at port 3008");
});
