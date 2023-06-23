const { Router } = require("express");
const User = require("../controllers/User");

const router = Router();

router.post("/signup", User.SignUp);
router.post("/login", User.Login);

module.exports = router;
