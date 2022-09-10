const jwt = require("jsonwebtoken");
const userModel = require("../services/UserService/model/model");
const {promisify} = require("util");
const tokenGenerator = require("../utils/tokenGenerator");
const config = require("../utils/initializer");

const accessManager = async (req, res) => {
  const header = req.headers;
  let user;
  if (header.hasOwnProperty.call(header, "access-token")) {
    const accessToken = header["access-token"];
    user = await checkAccessToken(accessToken);
  } else if (header.hasOwnProperty.call(header, "refresh-token")) {
    const refreshToken = header["refresh-token"];
    user = await checkRefreshToken(refreshToken, res);
    const accessToken = tokenGenerator.access(user.uid);
    res.setHeader("access-token", accessToken);
  } else {
    throw {
      status: 401,
      data: {message: "لطفا وارد حساب کاربری خود شوید"},
    };
  }
  req.userId = user.uid;
};

const checkAccessToken = async (token) => {
  const {uid: uid} = parseJwt(token);
  const user = await checkUser(uid);
  try {
    await promisify(jwt.verify)(token, process.env.ACCESS_JWT_SECRET);
  } catch (err) {
    throw {
      status: 401,
      data: {message: "لطفا دوباره وارد حساب کاربری خود شوید"},
    };
  }
  return user;
};

const checkRefreshToken = async (token, res) => {
  const {id: uid} = parseJwt(token);
  const tokenIsBlocked = await config.mongoDB
    .collection("tokenBlackList")
    .find({token})
    .toArray();
  if (tokenIsBlocked.length !== 0)
    throw {
      status: 401,
      data: {message: "لطفا دوباره وارد حساب کاربری خود شوید"},
    };
  const user = await checkUser(uid);
  try {
    await promisify(jwt.verify)(token, process.env.REFRESH_JWT_SECRET);
  } catch (e) {
    res.removeHeader("refresh-token");
    throw {
      status: 401,
      data: {message: "لطفا دوباره وارد حساب کاربری خود شوید"},
    };
  }
  return user;
};

const checkUser = async (uid) => {
  const user = await userModel.findUser({uid});
  if (!user) throw {status: 401, data: {message: "کاربری یافت نشد"}};
  return user;
};

const parseJwt = (token) => {
  const base64Url = token.split(".")[1];
  const payload = Buffer.from(base64Url, "base64");
  return JSON.parse(payload.toString());
};

module.exports = accessManager;
