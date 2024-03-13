require("dotenv").config();

const mongoose = require("mongoose");

mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// useNewUrlParser: Ensures compatibility with newer MongoDB versions.
//useUnifiedTopology: Enables the unified topology layer for improved connection  management.

mongoose.connection
  .on("open", () => {
    console.log("Mongoose connection open");
  })
  .on("error", (err) => {
    console.log(`Connection error : ${err.message}`);
  });


require("./models/registration");


const app = require("./app");

const server = app.listen(3000, () => {
  console.log(`express is running on port ${server.address().port}`);
});
