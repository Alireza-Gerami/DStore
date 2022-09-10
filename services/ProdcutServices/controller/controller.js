const bl = require("../businessLogic/bl");
const validator = require("../../../utils/validator");
const schemas = require("../../../utils/schema");
const {v4: uuidV4} = require("uuid");
const accessManager = require("../../../middleware/accessControl");

const createProduct = async (req, res) => {
  try {
    await accessManager(req, res);
    const body = req.body;
    await validator(body, schemas.productSchema);
    const input = {
      pid: uuidV4(),
      name: body.name,
      price: body.price,
      quantity: body.quantity,
      uid: req.userId,
    };
    const result = await bl.createProduct(input);
    res.status(result.status).send({data: result.data});
  } catch (err) {
    res.status(err.status).send(err.data);
  }
};
const updateProduct = async (req, res) => {
  try {
    await accessManager(req, res);
    const body = req.body;
    const params = req.params;
    await validator(body, schemas.productSchema);
    const input = {
      pid: params.pid,
      name: body.name,
      price: body.price,
      quantity: body.quantity,
      uid: req.userId,
    };
    const result = await bl.updateProduct(input);
    res.status(result.status).send({data: result.data});
  } catch (err) {
    res.status(err.status).send(err.data);
  }
};

const deleteProduct = async (req, res) => {
  try {
    await accessManager(req, res);
    const params = req.params;
    const input = {
      pid: params.pid,
      uid: req.userId,
    };
    const result = await bl.deleteProduct(input);
    res.status(result.status).send({data: result.data});
  } catch (err) {
    res.status(err.status).send(err.data);
  }
};
const getProduct = async (req, res) => {
  try {
    await accessManager(req, res);
    const params = req.params;
    const input = {
      pid: params.pid,
      uid: req.userId,
    };
    const result = await bl.getProduct(input);
    res.status(result.status).send({data: result.data});
  } catch (err) {
    res.status(err.status).send(err.data);
  }
};
const getProducts = async (req, res) => {
  try {
    await accessManager(req, res);
    const input = {
      uid: req.userId,
    };
    const result = await bl.getProducts(input);
    res.status(result.status).send({data: result.data});
  } catch (err) {
    console.log(err);
    res.status(err.status).send(err.data);
  }
};

module.exports = {
  createProduct,
  updateProduct,
  deleteProduct,
  getProduct,
  getProducts,
};
