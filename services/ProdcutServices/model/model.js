const config = require("../../../utils/initializer");

const insertProduct = async (data) => {
  return await config.mongoDB.collection("dayanProducts").insertOne(data);
};
const findProduct = async (query, projection) => {
  return await config.mongoDB
    .collection("dayanProducts")
    .findOne(query, { projection: projection });
};
const findProducts = async (query, projection) => {
  return await config.mongoDB
    .collection("dayanProducts")
    .find(query)
    .project(projection)
    .toArray();
};
const updateProduct = async (query, data) => {
  await config.mongoDB
    .collection("dayanProducts")
    .updateOne(query, { $set: data });
  return findProduct(query, { _id: 0 });
};
const deleteProduct = async (query) => {
  return await config.mongoDB.collection("dayanProducts").deleteOne(query);
};

module.exports = {
  insertProduct,
  findProduct,
  findProducts,
  updateProduct,
  deleteProduct,
};
