import mongoose from 'mongoose';

const db = {};

db.init = ({uri, options} = {}) =>  {
  mongoose.connect(uri, options);
  db.connection = mongoose.connection;
};

module.exports = db;