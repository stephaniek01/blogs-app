const Buffer = require('buffer').Buffer;
const Keygrip = require('keygrip');
const keys = require('../../config/keys');

module.exports = (user) => {
  console.log(user._id.toString());
  const sessionObject = { passport: { user: user._id.toString() } };

  const sessionString = Buffer.from(JSON.stringify(sessionObject)).toString(
    'base64'
  );

  const keygrip = new Keygrip([keys.cookieKey]);

  const sig = keygrip.sign('session=' + sessionString);

  return { session: sessionString, sig };
};
