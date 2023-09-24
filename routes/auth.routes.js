const express = require('express');
const { signUp, login } = require('../controllers/auth.controller');

const router = express.Router();

// @desc : User sign-up
// @route : POST /api/v1/auth/signup
// @access : Public
router.post('/signup', async (req, res, next) => {
  try {
    const user = await signUp(req.body);

    sendTokenResponse(user, 201, res);
  } catch (error) {
    next(error);
  }
})


// @desc : Login user
// @route : POST /api/v1/auth/login
// @access : Public
router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    
    const user = await login(email, password);

    sendTokenResponse(user, 200, res);
  } catch (error) {
    next(error);
  }
})


// Fetch token from model and send response
const sendTokenResponse = (user, statusCode, res) => {
    // Create JWT token
    const token = user.getSignedJwtToken();

    res
      .status(statusCode)
      .json({
          success: true,
          user,
          token
      });
}


module.exports = router;