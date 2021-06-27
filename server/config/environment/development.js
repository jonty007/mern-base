'use strict';

// Development specific configuration (For now same as local)
// ==================================

module.exports = {
  database: {
    uri: 'mongodb://localhost/mern_base',
    options: {
      keepAlive: 1,
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  },
  azure: {
    storage: {
      baseURL: '',
      accountName: '',
      key: '',
      connectionString: '',
      containerName: ''
    }
  },
  host: 'http://localhost:4001',
  https: false,
  http: {},
  client: true,
  clientBundle: {
    path: '../../frontend/web/build',
    fileName: 'index.html'
  },
  apidoc: true
};
