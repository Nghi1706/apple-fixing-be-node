const express = require("express");
const router = express.Router();
const userController = require("../../controllers/useUser");
const { authMiddleware } = require("../../middlewares/middleWare");

router.use(authMiddleware);

router.get("/user", userController.getUser);

module.exports = router;
