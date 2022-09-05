const config = require("../../../utils/initializer");

const insertUser = async (data) => {
  return await config.mongoDB.collection("dayanUsers").insertOne(data);
};
const findUser = async (query, projection) => {
  return await config.mongoDB
    .collection("dayanUsers")
    .findOne(query, { projection: projection });
};
const updateUser = async (query, data) => {
  await config.mongoDB
    .collection("dayanUsers")
    .updateOne(query, { $set: data });
  return findUser(query, { _id: 0, password: 0 });
};
const deleteUser = async (query) => {
  return await config.mongoDB.collection("dayanUsers").deleteOne(query);
};

module.exports = {
  insertUser,
  findUser,
  updateUser,
  deleteUser,
};
