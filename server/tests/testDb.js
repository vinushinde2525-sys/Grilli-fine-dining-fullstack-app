'use strict';

var { MongoMemoryServer } = require('mongodb-memory-server');
var mongoose = require('mongoose');

var mongod;

async function connect() {
  mongod = await MongoMemoryServer.create({
    instance: { launchTimeout: 60000 },
  });
  var uri = mongod.getUri();
  await mongoose.connect(uri, { serverSelectionTimeoutMS: 30000 });
}

async function clear() {
  var collections = mongoose.connection.collections;
  for (var key in collections) {
    await collections[key].deleteMany({});
  }
}

async function close() {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  if (mongod) await mongod.stop();
}

module.exports = { connect, clear, close };
