const express = require("express");
const usersDb = require("./userDb.js");

const router = express.Router();

router.post("/", (req, res) => {
  usersDb
    .insert(req.body)
    .then(user => {
      res.status(201).json(user);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.post("/:id/posts", validateUserId, validateUser, (req, res) => {
  const postInfo = { ...req.body, user_id: req.params.id };
  postsDb
    .insert(postInfo)
    .then(post => {
      res.status(201).json(post);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.get("/", (req, res) => {
  usersDb
    .get()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.get("/:id", validateUserId, (req, res) => {
  //  console.log('in get: ', req.user); // { id: 6, name: 'Boromir' }
  res.status(200).json(req.user);
});

router.get("/:id/posts", validateUserId, (req, res) => {
  usersDb
    .getUserPosts(req.params.id)
    .then(userPosts => {
      if (userPosts.length > 0) {
        res.status(200).json(userPosts);
      } else {
        res
          .status(404)
          .json({ message: "there are no any posts for the specified id" });
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.delete("/:id", validateUserId, (req, res) => {
  usersDb
    .remove(req.params.id)
    .then(user => {
      res.status(200).json({ message: "The user has been deleted" });
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.put("/:id", validateUserId, validateUser, (req, res) => {
  usersDb
    .update(req.params.id, req.body)
    .then(user => {
      res.status(201).json(user);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

//custom middleware

function validateUserId(req, res, next) {}

function validateUser(req, res, next) {}

function validatePost(req, res, next) {}

module.exports = router;
