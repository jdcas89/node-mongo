const { mongoose } = require("./../server/db/mongoose");
const { Todo } = require("./../server/models/todo");
const { User } = require("./../server/models/user");
const { ObjectID } = require("mongodb");

//remove all documents
// Todo.remove({}).then((result) => {
//   console.log(result)
// })

//remove 1 with specific query
// Todo.findOneAndRemove({}).then((todo) => {
//   console.log(todo)
// })

//find by id and remove
Todo.findByIdAndRemove({}).then(todo => {
  console.log(todo);
});
