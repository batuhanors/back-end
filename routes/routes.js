const express = require("express");
const router = express.Router();
const api = require("../controllers/api");

router.get("/", api.fetchAll);
router.get("/:id", api.fetchById);
router.post("/", api.createPost);
router.patch("/:id", api.updatePost);
router.delete("/id", api.deletePost);

module.exports = router;
