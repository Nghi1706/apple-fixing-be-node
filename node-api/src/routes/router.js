const express = require("express")
const router = express.Router()
const auth = require("../controllers/useAuth")
const user = require("../controllers/useUser")

router.get("/auth", auth.getAuth)
router.post("/user", user.getUser)


module.exports = router;