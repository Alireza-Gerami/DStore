const jwt = require("jsonwebtoken");

const access = (id) => {
  const token = jwt.sign({ id }, process.env.ACCESS_JWT_SECRET, {
    expiresIn: process.env.ACCESS_JWT_EXPIRES_IN,
  });
  return token;
};

const refresh = (id) => {
  const token = jwt.sign({ id }, process.env.REFRESH_JWT_SECRET, {
    expiresIn: process.env.REFRESH_JWT_EXPIRES_IN,
  });
  return token;
};

module.exports = { access, refresh };
