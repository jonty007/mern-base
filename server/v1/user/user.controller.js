import { Router } from 'express';
import { getProfilePicture } from '../file/file.service';
import { getUserDetails, getUserProfilePicture } from './user.service';

const user = Router();

/**
 * @api {get} /user/me
 * @apiName Find self user
 * @apiGroup User
 * @apiHeader {String} authorization Users unique access-key.
 * @apiHeader {String} Accept-Language language to get response for any messages from API. default to en (english)
 *
 * @apiSuccessExample {json} Success-Response:
 * {
 *   userDetails: {
 *    "_id": "60d886870dcace6be6826d90",
 *    "firstName": "Abc",
 *    "lastName": "Xyz",
 *    "email": "abc@xyz.com",
 *    "phone": "7788991212",
 *    "dob": "1994-29-12"
 *  }
 * }
 * 
 * @apiError (Error 400) ValidationError Validation failed
 *
 */
user.get('/user/me', async (req, res, next) => {
  try {
    const { userId } = req.user;
    console.log(userId);
    const userDetails = await getUserDetails(userId);
    return res.send({ data: { userDetails } });
  } catch (e) {
    if (e.message) {
      return res.status(405).send({
        message: e.message
      });
    }
    return next(e);
  }
});

/**
 * @api {get} /user/profile-picture
 * @apiName Get User Profile Picture
 * @apiGroup User
 * @apiHeader {String} authorization Users unique access-key.
 * @apiHeader {String} Accept-Language language to get response for any messages from API. default to en (english)
 *
 * @apiParam (Params) {uuid} user_id User ID of the User
 * @apiParam (Query) {string} [size] Size of file wanted('128x128', '256x256') - this list will be received in file object as image_sizes from get api
 *
 * @apiSuccessExample {json} Success-Response:
 * FILE
 *
 * @apiError (Error 400) ValidationError Validation failed
 */
user.get('/user/profile-picture', async (req, res, next) => {
  try {
    const { userId } = req.user;
    const imageDetails = await getUserProfilePicture(userId);
    return res.send({ data: { imageDetails } });
  } catch (e) {
    if (e.message) {
      return res.status(405).send({
        message: e.message
      });
    }
    return next(e);
  }
});

export default user;
