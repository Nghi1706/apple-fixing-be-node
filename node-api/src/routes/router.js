const express = require("express");
const router = express.Router();
const auth = require("../controllers/useAuth");
const user = require("../controllers/useUser");
const middleWare = require("../middlewares/middleWare");

// auth
router.post("/auth", auth.authenicate);
router.post("/renewAccessToken", auth.renewAccessToken);

// user
router.post("/user", user.createUser);
router.get("/user", middleWare.authMiddleware, user.getUser);

module.exports = router;
