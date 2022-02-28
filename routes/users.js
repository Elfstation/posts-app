const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const router = express.Router();
const User = require("../models/User");

const JWT_SECRET = "asdcasdaiscODJM1123@#!(*DAWXMH@#@!2321";

router.post("/signup", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || typeof username !== "string")
      return res
        .status(500)
        .json({ status: "error", message: "Invalid username" });

    if (!password || typeof password !== "string")
      return res
        .status(500)
        .json({ status: "error", message: "Invalid password" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      password: hashedPassword,
    });

    return res.json({ message: "ok", user: newUser });
  } catch (error) {
    return res
      .status(error.status || 500)
      .json({ status: "error", code: error.code });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username }).lean();

    if (!user)
      return res
        .status(500)
        .json({ status: "error", message: "Invalid credentials" });

    if (await bcrypt.compare(password, user.password)) {
      const token = jwt.sign(
        { id: user._id, username: user.username },
        JWT_SECRET
      );

      return res.json(token);
    } else
      return res
        .status(500)
        .json({ status: "error", message: "Invalid credentials" });
  } catch (error) {
    console.log(error);
    return res
      .status(error.status || 500)
      .json({ status: "error", code: error.code });
  }
});

module.exports = router;
