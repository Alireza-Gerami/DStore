const bl = require("../businessLogic/bl");
const validator = require("../../../utils/validator");
const schemas = require("../../../utils/schema");
const { v4: uuidV4 } = require("uuid");
const accessManager = require("../../../middleware/accessControl");

const registerUser = async (req, res) => {
  try {
    const body = req.body;
    await validator(body, schemas.userSchema);
    const input = {
      uid: uuidV4(),
      username: body.username,
      password: body.password,
      products: [],
    };
    const result = await bl.registerUser(input);
    res.status(result.status).send({ data: result.data });
  } catch (err) {
    res.status(err.status).send(err.data);
  }
};
const loginUser = async (req, res) => {
  try {
    const body = req.body;
    const input = {
      username: body.username,
      password: body.password,
    };
    const result = await bl.loginUser(input);
    res.status(result.status).send({ data: result.data });
  } catch (err) {
    console.log(err);
    res.status(err.status).send(err.data);
  }
};
const updateUser = async (req, res) => {
  try {
    await accessManager(req, res);
    const body = req.body;
    await validator(body, schemas.updateUserSchema);
    const input = {
      uid: req.userId,
      username: body.username,
    };
    const result = await bl.updateUser(input);
    res.status(result.status).send({ data: result.data });
  } catch (err) {
    res.status(err.status).send(err.data);
  }
};
const deleteUser = async (req, res) => {
  try {
    await accessManager(req, res);
    const input = {
      uid: req.userId,
    };
    const result = await bl.deleteUser(input);
    res.status(result.status).send({ data: result.data });
  } catch (err) {
    console.log(err);
    res.status(err.status).send(err.data);
  }
};
const getUser = async (req, res) => {
  try {
    await accessManager(req, res);
    const input = {
      uid: req.userId,
    };
    const result = await bl.getUser(input);
    res.status(result.status).send({ data: result.data });
  } catch (err) {
    res.status(err.status).send(err.data);
  }
};
module.exports = {
  registerUser,
  loginUser,
  updateUser,
  deleteUser,
  getUser,
};
