const mongoose = require("mongoose");

const ConnectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("DB online!");
  } catch (error) {
    console.log(error);
    throw new Error("Error en la base de datos");
  }
};

module.exports = {
  ConnectDB,
};
