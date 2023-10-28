const { decrypt } = require("../utils/encdec");

module.exports = function (req, res, next) {
  const token = req.header("token");
  if (!token) return res.status(400).send("Access Denied!, no token entered");

  try {
    const userDbConfig  = JSON.parse(decrypt(token, process.env.SECRET));
    req.body = {
      ...req.body,
      ...userDbConfig
    };
    next();
  } catch (err) {
    res.status(400).send({ error: "auth failed, check auth-token222" });
  }
};