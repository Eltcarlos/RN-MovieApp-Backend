const { Router } = require("express");
const movie = require("../controllers/Movie");

const router = Router();

router.post("/new", movie.CreateMovie);
router.get("/moviesmostviews", movie.GetMoviesMostViews);
router.post("/getwatchlist", movie.GetWatchList);
router.post("/getwatchinglist", movie.GetWatchingList);
router.post("/similarmovies", movie.GetSimilarMovies);
router.get("/getbygenremovies/:genre", movie.GetByGenreMovies);

module.exports = router;
