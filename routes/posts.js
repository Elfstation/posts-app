const express = require("express");
const jwt = require("jsonwebtoken");

const router = express.Router();
const Post = require("../models/Posts");

const JWT_SECRET = "asdcasdaiscODJM1123@#!(*DAWXMH@#@!2321";

const getUser = (token) => {
  return jwt.verify(token, JWT_SECRET);
};

router.get("/", async (req, res, next) => {
  try {
    const user = getUser(req.headers.authorization);

    if (user) {
      const posts = await Post.find({ isPrivate: false });
      return res.status(200).json(posts);
    }
    return res
      .status(500)
      .json({ status: "error", message: "Not Authenticated" });
  } catch (error) {
    res.status(error.status || 500).json(error);
  }
});

router.get("/private", async (req, res, next) => {
  try {
    const user = getUser(req.headers.authorization);

    if (user) {
      const posts = await Post.find({ isPrivate: true, author: user.id });
      return res.status(200).json(posts);
    }
    return res
      .status(500)
      .json({ status: "error", message: "Not Authenticated" });
  } catch (error) {
    res.status(error.status || 500).json(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const user = getUser(req.headers.authorization);

    if (user) {
      const post = await Post.findById(req.params.id);
      return res.status(200).json(post);
    }

    return res
      .status(500)
      .json({ status: "error", message: "Not Authenticated" });
  } catch (error) {
    res.status(error.status || 500).json(error);
  }
});

router.post("/", async (req, res) => {
  try {
    const user = getUser(req.headers.authorization);

    if (user) {
      const post = new Post({
        message: req.body.message,
        isPrivate: req.body.isPrivate ?? false,
        author: user.id,
      });

      const newPost = await post.save();
      return res.status(200).json(newPost);
    }

    return res
      .status(500)
      .json({ status: "error", message: "Not Authenticated" });
  } catch (error) {
    res.status(error.status || 500).json(error);
  }
});

router.patch("/:id", async (req, res, next) => {
  try {
    const user = getUser(req.headers.authorization);

    if (user) {
      const post = await Post.findById(req.params.id);

      if (post.author === user.id) {
        post.message = req.body.message;
        if (req.body.isPrivate) post.isPrivate = req.body.isPrivate;

        const newPost = await post.save();
        return res.status(200).json(newPost);
      }
      return res
        .status(500)
        .json({ status: "error", message: "Not Authorized" });
    }

    return res
      .status(500)
      .json({ status: "error", message: "Not Authenticated" });
  } catch (error) {
    console.log(error);
    res.status(error.status || 500).json(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const user = getUser(req.headers.authorization);

    if (user) {
      const post = await Post.findById(req.params.id);

      if (post.author === user.id) {
        await post.delete();
        return res.status(200).json({ message: "Successfully deleted" });
      }
      return res
        .status(500)
        .json({ status: "error", message: "Not Authorized" });
    }

    return res
      .status(500)
      .json({ status: "error", message: "Not Authenticated" });
  } catch (error) {
    console.log(error);
    res.status(error.status || 500).json(error);
  }
});

module.exports = router;
