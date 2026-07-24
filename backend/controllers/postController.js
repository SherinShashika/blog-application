const Post = require('../models/Post');
const User = require('../models/User');

const createPost = async (req, res) => {
    try {
        const { title, content } = req.body;

        const post = await Post.create({
            title,
            content,
            author: req.user._id
        });

        res.status(201).json({
            message: "Post created successfully",
            post
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

module.exports = {
    createPost,
}