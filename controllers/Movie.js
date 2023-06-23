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
  } catch (error) {}
};
module.exports = {
  CreateMovie,
  GetMoviesMostViews,
};
