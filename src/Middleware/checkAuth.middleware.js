const { decrypt } = require('../utils/encdec');

module.exports = function (req, res, next) {
  const token = req.header('token');
  if (!token) return res.status(400).json({ error: 'Access Denied!, no token entered' });

  try {
    const userDbConfig  = JSON.parse(decrypt(token, process.env.SECRET));
    if (userDbConfig.key !== process.env.key) {
      return res.status(401).json({ error: 'auth failed, check auth-token' });
    }
    if (userDbConfig.expire < Date.now()) {
      return res.status(402).json({ error: 'token expired'})
    }
    req.headers = {
      ...userDbConfig
    };
    next();
  } catch (err) {
    res.status(401).json({ error: 'auth failed, check auth-token' });
  }
};