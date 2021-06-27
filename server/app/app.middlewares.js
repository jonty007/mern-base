import cors from 'cors';
import { json, urlencoded } from 'express';
import compression from 'compression';
import morgan from 'morgan';
import methodOverride from 'method-override';
import modRewriteLib from 'connect-modrewrite';
import { logger } from './app.logger';
import i18n from '../config/i18n.config';
import translateMessage from '../middlewares/translate_message';

export default function(app) {
  app.use(compression());
  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ limit: '50mb', extended: true }));
  app.use(methodOverride());
  app.use(
    cors({
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS'.split(','),
      allowedHeaders: 'Content-Type,Authorization,Cache-Control'.split(','),
      preflightContinue: true
    })
  );

  app.use(
    modRewriteLib([
      '^/(api|v|auth|status)(.*)$ - [L,QSA]',
      '^/apidoc[^\\.]*$ /apidoc/index.html [L]',
      '^/client[^\\.]*$ /client/index.html [L]',
      '^/apple-app-site-association client/apple-app-site-association [L]',
      '^[^\\.]*$ client/index.html [L,QSA]'
    ])
  );

  app.use(function(req, res, next) {
    const query = {};

    Object.keys(req.query).forEach(key => {
      if (req.query[key] === 'true' || req.query[key] === 'false') {
        query[key] = req.query[key] === 'true';
      } else {
        query[key] = req.query[key];
      }
    });
    req.query = query;
    next();
  });

  // use internationalization for different locales
  app.use(i18n.init);

  app.use(function(req, res, next) {
    if (req.method === 'OPTIONS') {
      return res.status(200).send();
    }
    return next();
  });

  // health check for server
  app.use('/status', (req, res, next) => {
    res.send({ success: true, message: 'is.alive' });
  });

  // logging api requests through app logger
  app.use(
    morgan(
      (tokens, req, res) =>
        [
          (req.debug_log && '||DEBUG||') || '', // to skip status api from logs
          tokens.method(req, res),
          tokens.url(req, res),
          tokens.status(req, res),
          tokens.res(req, res, 'content-length'),
          '-',
          tokens['response-time'](req, res),
          'ms'
        ].join(' '),
      {
        stream: {
          write(message /* encoding */) {
            const debug_log = message.indexOf('||DEBUG||') !== -1,
              log_method = debug_log ? logger.debug : logger.info;
            log_method(message.replace('||DEBUG||', '').trim());
          }
        }
      }
    )
  );
  translateMessage(app);
}
