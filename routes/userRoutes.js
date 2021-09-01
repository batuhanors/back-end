const express = require("express");
const router = express.Router();
const API = require("../controllers/api.js");

router.get("/", API.fetchUsers);
router.post("/", API.createUser);
router.post("/login", API.getUser);
router.get("/user", API.getCookie);
router.post("/logout", API.logOut);

module.exports = router;
