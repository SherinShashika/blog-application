const express = require('express');
const passport = require('passport');

const { createPost } = require('../controllers/postController');

const router = express.Router();

router.post("/", passport.authenticate('jwt', { session: false }),
    createPost
);

module.exports = router;