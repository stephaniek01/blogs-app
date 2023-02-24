const redis = require('redis');
const client = redis.createClient();

/**
 * hget is not promisified
 */

(async () => {
  await client.connect();
  await client.hSet('info', 'date', '11/01/22');
  // client.expire('info', 1);

  try {
    const cachedVal = await client.hGet('info', 'date');
    console.log(cachedVal);
  } catch (error) {
    console.log(error);
  }

  // client.del('info');
  // setTimeout(() => {
  //   client.hGet('info', 'date').then((res) => {
  //     console.log('cached data ', res);
  //   });
  // }, 500);
  // setTimeout(() => {
  // client.hGet('info', 'date').then((res) => {
  //   console.log('cached data ', res);
  // });
  // }, 2000);

  // client.flushAll();

  // client.quit();
})();
