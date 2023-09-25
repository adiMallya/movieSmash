const express = require('express');
const { changePassword, updateProfilePicture, updateContactDetails } = require('../controllers/user.controller');
const { sendTokenResponse } = require('../controllers/auth.controller');
const { protect } = require('../middlewares/auth.middleware');

const router = express.Router();

// @desc : Update password
// @route : POST /api/v1/user/:userId/password
// @access : Public
router.post('/:userId/password', async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body

    const user = await changePassword(req.params.userId, currentPassword, newPassword);
    
  sendTokenResponse(user, 200, res);
  } catch (error) {
    next(error);
  }
});

// @desc : Update profile image
// @route : POST /api/v1/user/profile
// @access : Protected
router.post('/profile', protect, async (req, res, next) => {
  try {
    const { email, newProfileImage } = req.body

    const user = await updateProfilePicture(email, newProfileImage);
    
  res.status(200).json({
    success: true,
    user
  });
  } catch (error) {
    next(error);
  }
});

// @desc : Update user contact details
// @route : POST /api/v1/user/updateContact/:email
// @access : Protected
router.post('/updateContact/:email', protect, async (req, res, next) => {
  try {
    const user = await updateContactDetails(req.params.email, req.body);
    
  res.status(200).json({
    success: true,
    user
  });
  } catch (error) {
    next(error);
  }
});

module.exports = router;