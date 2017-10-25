var mongoose = require("mongoose");
const mongoUrl = process.env.MONGODB_URI;

//uses default promise library
mongoose.Promise = global.Promise;

mongoose.connect(mongoUrl);

module.exports = {
  mongoose: mongoose
};
