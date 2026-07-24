const express = require('express');
const passport = require('passport');

const { createPost, getPosts, getPostById } = require('../controllers/postController');

const router = express.Router();

router.post("/", passport.authenticate('jwt', { session: false }),
    createPost
);

router.get("/", getPosts);

router.get("/:id", getPostById);


module.exports = router;