const Movie = require("../models/mongoose/Movie");

const CreateMovie = async (req, res) => {
  try {
    const {
      title,
      poster,
      advance,
      video,
      director,
      category,
      plot,
      genres,
      age,
      releaseYear,
      duration,
      cast,
      totalViews,
    } = req.body;
    console.log(totalViews);
    const movie = new Movie({
      title,
      poster,
      advance,
      video,
      director,
      plot,
      category,
      genres,
      age,
      releaseYear,
      duration,
      cast,
      totalViews,
    });
    await movie.save();
    res.status(201).json({
      success: true,
      message: "Pelicula creada exitosamente",
      data: movie,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al crear la pelicula",
      error: error.message,
    });
  }
};

const GetMoviesMostViews = async (req, res) => {
  try {
    const moviesMostViews = await Movie.find().sort({ totalViews: -1 }).limit(10);
    res.status(201).json(moviesMostViews);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al obtener las peliculas",
      error: error.message,
    });
  }
};

const GetWatchList = async (req, res) => {
  try {
    const { watchlist } = req.body;
    const moviePromises = watchlist.map((movieId) => {
      return Movie.findById(movieId); // Función de búsqueda por ID de película
    });

    const movies = await Promise.all(moviePromises);
    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al obtener las peliculas",
      error: error.message,
    });
  }
};

const GetWatchingList = async (req, res) => {
  try {
    const { watchinglist } = req.body;
    const watchingMoviePromises = watchinglist.map(async (movie) => {
      const movieData = await Movie.findById(movie.movie);
      return {
        _id: movie.movie,
        title: movieData.title,
        poster: movieData.poster,
        advance: movieData.advance,
        video: movieData.video,
        director: movieData.director,
        plot: movieData.plot,
        category: movieData.category,
        genres: movieData.genres,
        age: movieData.age,
        releaseYear: movieData.releaseYear,
        duration: movieData.duration,
        cast: movieData.cast,
        totalViews: movieData.totalViews,
        elapsedTime: movie.elapsedTime,
      };
    });
    const watchingMovie = await Promise.all(watchingMoviePromises);

    res.status(200).json(watchingMovie);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al obtener las peliculas",
      error: error.message,
    });
  }
};

const GetSimilarMovies = async (req, res) => {
  try {
    const { movie } = req.body;
    const genres = movie.genres.map((genre) => genre.name);

    const similarMovies = await Movie.find({ "genres.name": { $in: genres } }).exec();
    const filteredMovies = similarMovies.filter((similarMovie) => similarMovie._id.toString() !== movie._id);

    res.status(200).json(filteredMovies);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al obtener las peliculas",
      error: error.message,
    });
  }
};

module.exports = {
  CreateMovie,
  GetMoviesMostViews,
  GetWatchList,
  GetWatchingList,
  GetSimilarMovies,
};
