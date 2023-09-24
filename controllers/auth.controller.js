const ErrorResponse = require('../utils/errorResponse');
const User = require('../models/users.model');

exports.signUp = async (userDetail) => {
  try {
    const userExists = await User.findOne({ username: userDetail.username });

    if(userExists){
      throw new ErrorResponse(`Username ${userDetail.username} already taken.`, 400)
    }

    const user = new User(userDetail);
    const newUser = await user.save();
    
    return newUser;
  } catch (error) {
    throw error;
  }
}

