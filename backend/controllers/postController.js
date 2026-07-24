const Post = require('../models/Post');

const createPost = async (req, res) => {
    try {
        const { title, content } = req.body;

        const post = await Post.create({
            title,
            content,
            author: req.user._id
        });

        res.status(200).json({
            message: "Post created successfully",
            post
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const getPosts = async (req, res) => {
    try {
        const posts = await Post.find()
            .populate("author", "name email")
            .sort({ createdAt: -1 });


        res.status(201).json({
            posts
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

module.exports = {
    createPost,
    getPosts
}