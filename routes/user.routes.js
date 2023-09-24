const express = require('express');
const { changePassword } = require('../controllers/user.controller');
const { sendTokenResponse } = require('../controllers/auth.controller');

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
})

module.exports = router;