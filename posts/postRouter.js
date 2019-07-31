const express = require("express");
const postsDB = require("./postDb.js");

const router = express.Router();

router.get("/", (req, res) => {
  postsDB.get().then(posts => {
    res.status(200).json(posts);
  });
});

router.get("/:id", (req, res) => {
  res.status(200).json(req.post);
});

router.delete("/:id", (req, res) => {
  postsDB
    .remove(req.params.id)
    .then(removed => {
      res.status(200).json({ message: "The post has has been removed" });
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.put("/:id", (req, res) => {
  postsDB
    .update(req.params.id, req.body)
    .then(post => {
      res.status(201).json(post);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

// custom middleware

function validatePostId(req, res, next) {}

module.exports = router;
