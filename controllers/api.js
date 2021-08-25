const Post = require("../models/postSchema.js");

module.exports = class api {
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
    res.send("Fetch post by ID");
  }

  //Create post
  static async createPost(req, res) {
    const post = req.body;
    try {
      await Post.create(post);
      res.status(201).json({ message: "Post created successfully", log: post });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  //Update Post
  static async updatePost(req, res) {
    res.send("update post");
  }

  //Delete Post
  static async deletePost(req, res) {
    res.send("delete post");
  }
};
