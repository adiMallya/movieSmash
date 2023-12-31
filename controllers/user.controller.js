const ErrorResponse = require('../utils/errorResponse');
const User = require('../models/users.model');

exports.changePassword = async (userId, currentPassword, newPassword) => {
  try {
     const user = await User.findById(userId);

     if(!user){
       throw new ErrorResponse(`User not found with id of ${userId}`, 400);
     }

     //Check current password
    if (! await user.matchPassword(currentPassword)) {
        throw new ErrorResponse('Password is incorrect', 401);
    }

    user.password = newPassword;
    await user.save();

    return user;
  } catch (error) {
    throw error;
  }
}

exports.updateProfilePicture = async (email, newProfileImage) => {
  try {
     const user = await User.findOne({email});

     if(!user){
       throw new ErrorResponse(`User not found with email of ${email}`, 400);
     }

    user.profileImage = newProfileImage;
    await user.save();

    return user;    
  } catch (error) {
    throw error;
  }
}

exports.updateContactDetails = async (email, contactDetails) => {
  try {
     const user = await User.findOne({email});

     if(!user){
       throw new ErrorResponse(`User not found with email of ${email}`, 400);
     }

    const { phoneNumber, address } = contactDetails;
    
    if(!(phoneNumber && address)){
      throw new ErrorResponse('Missing contact details to be updated.', 400);
    }

    Object.assign(user, contactDetails);
    await user.save();

    return user;    
  } catch (error) {
    throw error;
  }
};

exports.findUserByPhoneNumber = async (phoneNumber) => {
  try{
    const user = await User.findOne({ phoneNumber 
 });

    if(!user){
      throw new ErrorResponse(`No user found with this phone number.`, 400);
    }

    return user;
  }catch(error){
    throw error;
  }
}