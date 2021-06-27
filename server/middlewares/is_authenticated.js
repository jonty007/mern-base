import { decodeJWT } from '../common/auth.utils';
import compose from 'composable-middleware';

/**
 * @apiDefine isAuthenticated
 *
 * @apiHeader {String} Authorization User bearer token
 *
 * @apiError (Error 401) UnauthorizedError Please make sure your request has an Authorization header.
 * @apiError (Error 401) UnauthorizedError Your session has expired.
 * @apiError (Error 401) UnauthorizedError Invalid session.
 */
export default function isAuthenticated() {
  return compose().use(async (req, res, next) => {
    const { authorization: bearerToken } = req.headers;

    if (!bearerToken) {
      return res.status(401).send({
        message: 'Please make sure your request has an Authorization header.'
      });
    }

    const [, authToken] = bearerToken.split(' ');
    let payload;
    try {
      payload = await decodeJWT({ token: authToken });
    } catch (e) {
      if (e.message === 'Token expired') {
        return res.status(401).send({ message: 'Your session has expired.' });
      }
      return res.status(401).send({ message: 'Invalid session.' });
    }

    if (!payload || !payload.user) {
      return res.status(401).send({ message: 'Invalid session.' });
    }

    req.user = {
      userId: payload.user.id
    };

    return next();
  });
}
