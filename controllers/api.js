const Post = require("../models/postSchema.js");

module.exports = class API {
  // Fetch all posts
  static async fetchAll(req, res) {
    try {
      const posts = await Post.find();

      res.status(200).json(posts);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  }

  //Fetch post by ID
  static async fetchById(req, res) {
    const id = req.params.id;
    try {
      const post = await Post.findById(id);
      res.status(200).json(post);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }

  //Create post
  static async createPost(req, res) {
    const post = req.body;
    try {
      await Post.create(post);
      res.status(201).json({ message: "Post created successfully" });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  //Update Post
  static async updatePost(req, res) {
    const id = req.params.id;
    const newPost = req.body;
    try {
      await Post.findByIdAndUpdate(id, newPost);
      res.status(200).json({ message: "Post updated successfully" });
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }

  //Delete Post
  static async deletePost(req, res) {
    const id = req.params.id;
    try {
      await Post.findByIdAndDelete(id);
      res.status(200).json({ message: "Post deleted succesfully" });
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }
};
