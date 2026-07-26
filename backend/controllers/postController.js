const Post = require('../models/Post');

const createPost = async (req, res, next) => {
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
        next(error);
    }
}

const getPosts = async (req, res, next) => {
    try {
        const posts = await Post.find()
            .populate("author", "name email")
            .sort({ createdAt: -1 });


        res.status(200).json({
            posts
        })
    } catch (error) {
        next(error);
    }
}

const getPostById = async (req, res, next) => {
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
        next(error);
    }
}

const updatePost = async (req, res, next) => {
    try {
        const { title, content } = req.body;

        const post = await Post.findById(req.params.id)

        if (!post) {
            return res.status(404).json({
                message: "Post not found"
            });
        }

        if (post.author.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                message: "You are not authorized to update this post"
            });
        }

        post.title = title || post.title;
        post.content = content || post.content;

        await post.save();

        res.status(200).json({
            message: "Post updated successfully",
            post
        })
    } catch (error) {
        next(error);
    }
}

const deletePost = async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.id)

        if (!post) {
            return res.status(404).json({
                message: "Post not found"
            });
        }

        if (post.author.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                message: "You are not authorized to update this post"
            });
        }

        await post.deleteOne();

        res.status(200).json({
            message: "Post deleted successfully",
            post
        })
    } catch (error) {
        next(error);
    }
}

module.exports = {
    createPost,
    getPosts,
    getPostById,
    updatePost,
    deletePost
}