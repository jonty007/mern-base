import {User} from '../../db/models';
import { getProfilePicture } from '../file/file.service';

export async function getUserDetails(userId) {
  const user = await User.findById(userId);
  return convertToUserDTO(user);
}

export async function getUserProfilePicture(userId) {
  const user = await User.findById(userId);
  
  const info = await getProfilePicture(user.profileImageId.toString());
  return info;
}

function convertToUserDTO(user) {
  return {
    _id: user._id.toString(),
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phone: user.phone,
    dob: user.dob
  }
}
