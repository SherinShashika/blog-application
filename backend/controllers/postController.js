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


        res.status(200).json({
            posts
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const getPostById = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
            .populate("author", "name email")

        if (!post) {
            return res.status(404).json({
                message: "Post not found"
            });
        }

        res.status(200).json({
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
    getPosts,
    getPostById,
}