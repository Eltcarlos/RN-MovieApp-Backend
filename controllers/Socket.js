const User = require("../models/mongoose/User");
const Movie = require("../models/mongoose/Movie");

const updateCurrentlyWatching = async (data) => {
  try {
    const user = await User.findById(data.user);
    const watchingMovieIndex = user.currentlyWatching.findIndex((item) => item.movie.toString() === data.id);
    if (watchingMovieIndex !== -1) {
      user.currentlyWatching[watchingMovieIndex].elapsedTime = data.positionMillis || 0;
    } else {
      user.currentlyWatching.push({ movie: data.id, elapsedTime: data.positionMillis || 0 });
    }

    await user.save();
    return user;
  } catch (error) {
    console.error(error);
  }
};

const getCurrentlyWatching = async (data) => {
  const user = await User.findById(data.user);
  const watchingMoviePromises = user.currentlyWatching.map(async (movie) => {
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
  return watchingMovie;
};

const updateWatchList = async (data) => {
  try {
    const user = await User.findById(data.user);
    const watchingList = user.watchlist.includes(data.movieId);
    if (!watchingList) {
      user.watchlist.push(data.movieId);
    }
    await user.save();
    return user;
  } catch (error) {
    console.log(error);
  }
};

const getWatchList = async (data) => {
  try {
    // const user = await User.findById(data.user);
    // const watchingMoviePromises = user.currentlyWatching.map(async (movie) => {
    //   const movieData = await Movie.findById(movie.movie);
    //   return {

    //   }
    // })
    const user = await User.findById(data.user);
    const watchlistMovies = await Movie.find({ _id: { $in: user.watchlist } });
    return watchlistMovies;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  updateCurrentlyWatching,
  getCurrentlyWatching,
  updateWatchList,
  getWatchList,
};
