const jwt = require("jsonwebtoken");

const access = (uid) => {
  const token = jwt.sign({ uid }, process.env.ACCESS_JWT_SECRET, {
    expiresIn: process.env.ACCESS_JWT_EXPIRES_IN,
  });
  return token;
};

const refresh = (uid) => {
  const token = jwt.sign({ uid }, process.env.REFRESH_JWT_SECRET, {
    expiresIn: process.env.REFRESH_JWT_EXPIRES_IN,
  });
  return token;
};

module.exports = { access, refresh };
