const Post = require("../models/postSchema.js");
const User = require("../models/userSchema.js");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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

  /* ####################################
          USER API  
     #################################### */

  // SIGN UP
  static async createUser(req, res) {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPass = await bcrypt.hash(req.body.password, salt);
      const newUser = new User({
        username: req.body.username,
        password: hashedPass,
      });
      await newUser.save();
      res.status(200).json({ message: "User created successfully" });
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }

  // LOGIN
  static async getUser(req, res) {
    try {
      const user = await User.findOne({ username: req.body.username });

      if (!user) {
        return res.status(404).send({ message: "user not found" });
      }

      if (!(await bcrypt.compare(req.body.password, user.password))) {
        return res.status(404).send({ message: "invalid password" });
      }

      // JWT
      const token = jwt.sign(
        { _id: user._id },
        process.env.ACCESS_TOKEN_SECRET
      );
      res.cookie("jwt", token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000, // 1day
      });
      res.send({ message: "Success" });
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }

  // GET JWT COOKIE
  static async getCookie(req, res) {
    try {
      const cookie = req.cookies["jwt"];
      const claims = jwt.verify(cookie, process.env.ACCESS_TOKEN_SECRET);

      if (!claims) {
        return res.status(401).send({ message: "unauthenticated" });
      }

      const user = await User.findOne({ _id: claims._id });
      const { password, ...data } = await user.toJSON();
      res.send(data);
    } catch (error) {
      res.status(401).json({ message: error.message });
    }
  }

  //LOGOUT
  static async logOut(req, res) {
    res.cookie("jwt", "", { maxAge: 0 });
    res.send({ message: "logout success." });
    console.log("hey!");
  }

  static async fetchUsers(req, res) {
    try {
      const users = await User.find();

      res.status(200).json(users);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  }
};
