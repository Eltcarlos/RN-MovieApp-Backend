const { Router } = require("express");
const User = require("../controllers/User");

const router = Router();

router.post("/getuser", User.getUser);

module.exports = router;
