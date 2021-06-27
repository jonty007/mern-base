import express, { Router } from 'express';
const path = require('path');
import { apidoc, client, clientBundle } from '../config';
import isAuthenticated from '../middlewares/is_authenticated';

const v1router = Router();

export default function(app) {

  app.use('/api/v1', v1router);
  v1router.use(require('../v1/auth/auth.controller').default);
  // v1router.use(require('../v1/file/file.controller').default);

  /* Module specific controllers */
  /* Authentication middleware*/
  v1router.use(isAuthenticated());

  /* User */
  v1router.use(require('../v1/user/user.controller').default);

  /* Matches in client dist folder for any unmatched routes */
  if (apidoc === true) {
    app.use('/apidoc', express.static(path.join(__dirname, '../dist/apidoc')));
  }
  if (client === true) {
    app.use(express.static(path.join(__dirname, clientBundle.path)));
    app.get(/^(client|login|resetPassword|register)*/, function(req, res) {
      res.sendFile(path.join(__dirname, clientBundle.path, clientBundle.fileName));
    });
  }
}
