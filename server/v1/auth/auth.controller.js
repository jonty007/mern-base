import { Router } from 'express';
import multer from 'multer';
import { login, signUp } from './auth.service';

// To parse file data
const upload = multer();

const auth = Router();



/**
 * @api {post} /auth/sign-up
 * @apiName User Sign-Up
 * @apiGroup Auth
 *
 * @apiHeader {String} Accept-Language language to get response for any messages from API. default to en (english)
 *
 * @apiParam (FormData) {String} email User email
 * @apiParam (FormData) {String} password Password
 * @apiParam (FormData) {String} firstName First name
 * @apiParam (FormData) {String} lastName Last name
 * @apiParam (FormData) {String} dob Date of birth
 * @apiParam (FormData) {String} phone Phone
 * @apiParam (FormData) {File} profile Profile picture
 *
 * @apiParamExample  {FormData} Request-Example:
 * {
 *  "email": "xyz@gmail.com",
 *  "firstName": "vivek",
 *  "lastName": "singh",
 *  "dob": "1994-12-19",
 *  "password": "12345678",
 *  "phone": "7000443510",
 *  "profile": "file"
 * }
 *
 * @apiSuccessExample {json} Success-Response:
 * {
 *   data: {
 *    token,  // JWT token of the user logging in
 *    user: {
 *      id,  // Logged in user id
 *    }
 *  }
 * }
 *
 * @apiError (Error 400) ValidationError Validation failed!
 *
 */
auth.post('/auth/sign-up', upload.single('profile'), async (req, res, next) => {
  try {
    const {userId, token} = await signUp(req.body, req.file);

    return res.send({data: {token, user: {id: userId}}})
    
  } catch (e) {
    if (e.message) {
      return res.status(400).send({
        message: e.message
      });
    }
    return next(e);
  }
});

/**
 * @api {post} /auth/login Login
 * @apiName User login
 * @apiGroup Auth
 *
 * @apiHeader {String} Accept-Language language to get response for any messages from API. default to en (english)
 *
 * @apiParam (Body) {String} email User email
 * @apiParam (Body) {String} password Password
 *
  * @apiSuccessExample {json} Success-Response:
 * {
 *   data: {
 *    token,  // JWT token of the user logging in
 *    user: {
 *      id,  // Logged in user id
 *    }
 *  }
 *
 * @apiSuccessExample {json} Success-Response:
 * {
 *   token,  // JWT token of the user logging in
 *   user: {
 *      id,  // Logged in user id
 *   }
 * }
 *
 * @apiError (Error 400) ValidationError Validation failed!
 *
 */
auth.post('/auth/login', async (req, res, next) => {
  try {
    const {userId, token} = await login(req.body);

    return res.send({data: {token, user: {id: userId}}})
  } catch (e) {
    if (e.message) {
      return res.status(400).send({
        message: e.message
      });
    }
    return next(e);
  }
});

export default auth;
