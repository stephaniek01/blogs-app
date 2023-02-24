const Keygrip = require('keygrip');
const Buffer = require('buffer').Buffer;

keys = new Keygrip(['123123123']);

const session = Buffer.from([
  JSON.stringify({ passport: { user: '63bd0f76d2dd016f22eb77f0' } }),
]).toString('base64');

console.log(session);
// console.log(JSON.parse(session.toString()));

// const session = keys.sign
