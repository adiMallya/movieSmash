const ErrorResponse = require('../utils/errorResponse');
const Movie = require('../models/movies.model');
const User = require('../models/users.model');

exports.addRatingAndReview = async (movieId, userId, rating, review) => {
  try{
    const movie  = await Movie.findById(movieId);

    if(!movie){
      throw new ErrorResponse(`Movie not found with id of ${movieId}.`, 400);  
    }

    //Adding user review and rating
    const userReview = {
      user: userId,
      review,
      rating
    }
    movie.reviews.push(userReview);

    //Updating overall rating of the movie
    const totalReviews = movie.reviews.length;
    const aggregateRating = movie.reviews.reduce((sum, { rating }) => sum + rating, 0);
    movie.rating = aggregateRating / totalReviews;

    await movie.save();

    const updatedMovieWithReviews = await Movie.findById(movieId).populate('reviews.user', 'username');
    
    return updatedMovieWithReviews;
  }catch(err){
    throw err;
  }
}

exports.getMovieReviewsWithUserDetails = async (movieId) => {
  try{
    const movie = await Movie.findById(movieId).populate({
      path: 'reviews',
      populate: {
        path: "user",
        select: "username profileImage"
      }
    });

    if(!movie){
      throw new ErrorResponse(`Movie not found with id of ${movieId}.`, 400);
    }
    
    const reviews = movie.reviews.slice(0, 3).map(review => ({
      review: review.review,
      rating: review.rating,
      user: review.user
    }));
    
    return reviews;
  }catch(error){
    throw error;
  }
}

exports.readAllMovies = async () => {
  try{
    const movies = await Movie.find();

    return movies;
  } catch(error){
    throw error;
  } 
}

exports.readMovieByTitle = async (title) => {
  try{
    const movie = await Movie.findOne({ title });

    if(!movie){
      throw new ErrorResponse(`Movie not found with title of ${title}.`, 400);
    }

    return movie;
  } catch(error){
    throw error;
  } 
}

exports.readMoviesByDirector = async (director) => {
  try{
    const movies = await Movie.find({ director });

    if(!movies.length){
      throw new ErrorResponse(`No movies found of this director.`, 400);
    }

    return movies;
  }catch(error){
    throw error;
  }
}

exports.readMoviesByGenre = async (genre) => {
  try{
    const movies = await Movie.find({ genre });

    if(!movies.length){
      throw new ErrorResponse(`No movies found in the genre of ${genre}.`, 400);
    }

    return movies;
  } catch(error){
    throw error;
  } 
}
