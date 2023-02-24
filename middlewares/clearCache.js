const { delCache } = require('../services/cache');

const clearCache = async (req, res, next) => {
  await next();
  delCache(req.user.id);
};

module.exports = { clearCache };
