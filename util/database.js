const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callback) => {
  MongoClient.connect(
    'mongodb+srv://dzhuro1988_db_user:bSQou8zLNVCYIkZR@cluster0.m8eavvv.mongodb.net/shop', //your connector
  )
    .then((client) => {
      console.log('Connected DB!');
      // _db is a global variable that stores the database object
      _db = client.db();
      callback();
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};

// getDb is a function that returns the database object
// it is used to get the database object in the other files
const getDb = () => {
  if (_db) {
    return _db;
  }
  throw 'No database found!';
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
