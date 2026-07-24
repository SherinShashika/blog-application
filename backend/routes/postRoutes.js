const express = require('express');
const passport = require('passport');

const { createPost, getPosts } = require('../controllers/postController');

const router = express.Router();

router.post("/", passport.authenticate('jwt', { session: false }),
    createPost
);

router.get("/", getPosts);

module.exports = router;