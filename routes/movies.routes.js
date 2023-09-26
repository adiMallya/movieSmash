const express = require('express');
const { 
  readAllMovies, 
  addRatingAndReview,     
  getMovieReviewsWithUserDetails,
  readMovieByTitle, 
  readMoviesByDirector,
  readMoviesByGenre
} = require('../controllers/movies.controller');
const { protect } = require('../middlewares/auth.middleware');

const router = express.Router();

// @desc : Fetch Movies
// @route : GET /api/v1/movies
// @access : Public
router.get('/', async (req, res, next) => {
  try{
    const { title, director, genre } = req.query

    let movies = [];
    if(!(title || director || genre)){
      movies = await readAllMovies();
      res.status(200).json({
        success: true,
        count: movies.length,
        movies
      });  
    }

    if(title){
      const movie = await readMovieByTitle(title);

      res.status(200).json({
        success: true,
        movie
      });  
    }
    
    if(director){
      movies = await readMoviesByDirector(director);

      res.status(200).json({
        success: true,
        movies
      });  
    }

    if(genre){
      movies = await readMoviesByGenre(genre);
      
      res.status(200).json({
        success: true,
        count: movies.length,
        movies
      });  
    }
  }catch(error){
    next(error);
  }
});

// @desc : Get a movie by title
// @route : GET /api/v1/movies/:title
// @access : Public
router.get('/:title', async (req, res, next) => {
  try{
    const movie = await readMovieByTitle(req.params.title);
    
    res.status(200).json({
      success: true,
      movie
    });  
  }catch(error){
    next(error);
  }
});

// @desc : Get movies by director
// @route : GET /api/v1/movies/director/:directorName
// @access : Public
router.get('/director', async (req, res, next) => {
  try{
    const movies = await readMoviesByDirector(req.query.directorName);

    res.status(200).json({
      success: true,
      movies
    });  
  } catch(error){
    next(error);
  } 
});

router.get('/genre/:gen')
// @desc : Get all reviews for a movie
// @route : GET /api/v1/movies/:movieId/reviews
// @access : Public
router.get('/:movieId/reviews', async (req, res, next) => {
  try{
    const reviews = await getMovieReviewsWithUserDetails(req.params.movieId);
    res.status(200).json({
      success: true,
      reviews
    });  
  }catch(error){
    next(error);
  }
});

// @desc : Post a review
// @route : POST /api/v1/movies/:movieId/rating
// @access : Protected
router.post('/:movieId/rating', protect, async (req, res, next) => {
  try {
    const { rating, review } = req.body;
    const { _id : userId } = req.user;

    const movie = await addRatingAndReview(req.params.movieId, userId, rating, review);
    
  res.status(200).json({
    success: true,
    movie
  });
  } catch (error) {
    next(error);
  }
});

module.exports = router;