import { Router } from 'express';
import multer from 'multer';

// To parse file data
const upload = multer();

const file = Router();

/**
 * @api {post} /file/profile-upload
 * @apiName Profile upload
 * @apiGroup FIle
 *
 * @apiHeader {String} authorization Users unique access-key.
 * @apiHeader {String} Accept-Language language to get response for any messages from API. default to en (english)
 *
 * @apiParam (FormData) {File} profile Profile picture
 *
 * @apiParamExample  {FormData} Request-Example:
 * {
 *  "profile": "file"
 * }
 *
 * @apiSuccessExample {json} Success-Response:
 * {
 *   data: {
 *    fileId: "60d886870dcace6be6826d90"
 *  }
 * }
 *
 * @apiError (Error 400) ValidationError Validation failed!
 *
 */
file.post('/file/profile-upload', upload.single('profile'), async (req, res, next) => {
  try {
    const uploadedFile = await saveProfileFile(req.file);

    return res.send({ data: { fileId: uploadedFile._id.toString() } });
  } catch (e) {
    if (e.message) {
      return res.status(400).send({
        message: e.message
      });
    }
    return next(e);
  }
});
