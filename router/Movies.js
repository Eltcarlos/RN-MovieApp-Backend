const { Router } = require("express");
const movie = require("../controllers/Movie");

const router = Router();

router.post("/new", movie.CreateMovie);
router.get("/moviesmostviews", movie.GetMoviesMostViews);

module.exports = router;
