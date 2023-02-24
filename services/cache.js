const redis = require('redis');
const mongoose = require('mongoose');

let redisClient;

(async () => {
  redisClient = redis.createClient();
  await redisClient.connect();

  redisClient.on('connect', () => {
    console.log('REDIS connected successfully');
  });
  redisClient.flushAll();
})();

mongoose.Query.prototype.cache = function (options = {}) {
  this.useCache = true;
  this.hashKey = JSON.stringify(options.key || '');

  return this;
};

const exec = mongoose.Query.prototype.exec;

mongoose.Query.prototype.exec = async function () {
  if (!this.useCache) {
    return await exec.apply(this, arguments);
  }

  const key = JSON.stringify(
    Object.assign({}, this.getQuery(), {
      collection: this.model.collection.name,
    })
  );

  console.log(key);

  const cachedData = await redisClient.hGet(this.hashKey, key);

  if (cachedData) {
    return JSON.parse(cachedData);
  }

  const mongoData = await exec.apply(this, arguments);
  await redisClient.hSet(this.hashKey, key, JSON.stringify(mongoData));

  return mongoData;
};

const delCache = async function (hashKey) {
  await redisClient.del(hashKey);
};

module.exports = {
  delCache,
};
