import validator from 'validator';
import { User } from '../../db/models';
import moment from 'moment';
import { saveProfileFile } from '../file/file.service';
import { createJWT } from '../../common/auth.utils';

export async function signUp(data, file) {
  const { email, firstName, lastName, dob, password, phone } = data;

  if (!email || !validator.isEmail(email)) {
    throw new Error('AUTH.SIGN_UP.INVALID_EMAIL');
  }

  // required
  if (!firstName || !validator.isAlpha(firstName)) {
    throw new Error('AUTH.SIGN_UP.INVALID_FIRST_NAME');
  }

  // not required, validate only if present
  if (lastName && !validator.isAlpha(lastName)) {
    throw new Error('AUTH.SIGN_UP.INVALID_LAST_NAME');
  }

  if (!dob || !moment(dob, 'YYYY-MM-DD').isValid()) {
    throw new Error('AUTH.SIGN_UP.INVALID_DOB');
  }

  if (
    !password ||
    !validator.isAlphanumeric(password) ||
    !validator.isLength(password, { min: 8 })
  ) {
    throw new Error('AUTH.SIGN_UP.INVALID_PASSWORD');
  }

  if (phone && !(validator.isNumeric(phone) && validator.isLength(phone, { min: 10, max: 10 }))) {
    throw new Error('AUTH.SIGN_UP.INVALID_PHONE');
  }

  if (!file) {
    throw new Error('AUTH.SIGN_UP.INVALID_FILE');
  }

  const profile = await saveProfileFile(file);

  const user = new User();

  user.firstName = firstName;
  user.lastName = lastName;
  user.email = email;
  user.phone = phone;
  user.password = password;
  user.dob = dob;
  user.profileImageId = profile._id;

  const savedUser = await user.save();
  const userId =  savedUser._id.toString();
  const token_user = {
    id: userId,
    first_name: savedUser.firstName
  };
  const token = createJWT({ data: { user: token_user } });
  return {token, userId};
}

export async function login({email, password}) {
  if (!email || !password) {
    throw new Error("AUTH.LOGIN.INVALID_CREDENTIALS");
  }
  const user = await User.findOne({email: email});
  if (!user) {
    throw new Error("AUTH.LOGIN.USER_NOT_FOUND");
  }
  if(!user.isPasswordMatch(password)) {
    throw new Error("AUTH.LOGIN.USER_NOT_FOUND");
  }

  const userId =  user._id.toString();
  const token_user = {
    id: userId,
    first_name: user.firstName
  };
  const token = createJWT({ data: { user: token_user } });
  return {token, userId};
}
