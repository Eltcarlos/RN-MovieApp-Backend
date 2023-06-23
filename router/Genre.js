const { Router } = require("express");
const genre = require("../controllers/Genre");

const router = Router();

router.post("/new", genre.createGenre);

module.exports = router;
