const mongodb = require("mongodb");

class Config {
  static async initMongo() {
    const mongoUrl = process.env.DAYAN_DATABASE_URL;
    Config.databaseName = process.env.DAYAN_DATABASE_NAME;
    Config.mongoDBConnection = await mongodb.MongoClient.connect(mongoUrl, {
      useNewUrlParser: true,
    });
    Config.mongoDB = Config.mongoDBConnection.db(Config.dbName);
  }
  static async initialize() {
    await Config.initMongo();
  }
}

module.exports = Config;
