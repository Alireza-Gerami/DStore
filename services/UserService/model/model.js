const config = require("../../../utils/initializer");

const insertUser = async (data) => {
  return await config.mongoDB.collection("users").insertOne(data);
};
const findUser = async (query) => {
  return await config.mongoDB
    .collection("users")
    .findOne(query, { projection: { _id: 0 } });
};
const updateUser = async (query, data) => {
  await config.mongoDB.collection("users").updateOne(query, { $set: data });
  return findUser(query);
};
const deleteUser = async (query) => {
  return await config.mongoDB.collection("users").deleteOne(query);
};

module.exports = {
  insertUser,
  findUser,
  updateUser,
  deleteUser,
};
