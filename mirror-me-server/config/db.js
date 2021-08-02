const mongoose = require("mongoose");

// Replace this with your MONGOURI.
const MONGOURI =
  "mongodb://main:main@172.31.1.180/mirrorme";

const InitiateMongoServer = async () => {
  try {
    await mongoose.connect(MONGOURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to DB !!");
  } catch (e) {
    console.log(e);
    throw e;
  }
};

module.exports = InitiateMongoServer;
