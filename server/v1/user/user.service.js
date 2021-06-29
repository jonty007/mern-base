import {User} from '../../db/models';
import { getProfilePicture } from '../file/file.service';
import moment from 'moment';

export async function getUserDetails(userId) {
  const user = await User.findById(userId);
  return convertToUserDTO(user);
}

export async function getUserProfilePicture(userId) {
  const user = await User.findById(userId);
  
  const info = await getProfilePicture(user.profileImageId.toString());
  return info;
}

export async function updateUserProfile(userId, data) {
  const {
    firstName,
    lastName,
    phoneNumber,
    dob,
    profileImageId
  } = data;

  console.log(firstName, lastName, phoneNumber, dob, profileImageId);
  if (!firstName) {
    throw new Error('USER.UPDATE.REQUIRED_FIRST_NAME');
  }

  if (!dob || !moment(dob, 'YYYY-MM-DD').isValid()) {
    throw new Error('USER.UPDATE.REQUIRED_DOB');
  }

  if (!profileImageId) {
    throw new Error('USER.UPDATE.REQUIRED_PROFILE_IMAGE');
  }

  const updatedUser = await User.findByIdAndUpdate(userId, {
    firstName,
    lastName,
    phone: phoneNumber,
    dob,
    profileImageId
  });

  return convertToUserDTO(updatedUser);

}

function convertToUserDTO(user) {
  return {
    _id: user._id.toString(),
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phone: user.phone,
    dob: user.dob,
    profileImageId: user.profileImageId.toString()
  }
}
