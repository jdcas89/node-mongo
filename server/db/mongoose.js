var mongoose = require('mongoose')
const dbName = 'TodoApp'
const mongoUrl = `mongodb://localhost:27017/${dbName}`

//uses default promise library
mongoose.Promise = global.Promise

mongoose.connect(mongoUrl)

module.exports = {
  mongoose: mongoose
}