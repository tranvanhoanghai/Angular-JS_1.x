const mongoose = require("mongoose");

/**
 * Connect DB.
 */

async function connect() {
  try {
    await mongoose.connect("mongodb://localhost:27017/crm_db_dev", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });
    console.log("Connect success");
  } catch (error) {
    console.log("Connect error", error);
  }
}

module.exports = { connect };
