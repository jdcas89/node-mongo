const { MongoClient, ObjectID } = require("mongodb");

const dbName = "TodoApp";
const mongoUrl = `mongodb://localhost:27017/${dbName}`;

MongoClient.connect(mongoUrl, (err, db) => {
  if (err) {
    return console.log("Unable to connect to MongoDB server");
  }
  console.log("Connected to MongoDB server");

  // db.collection('Todos').insertOne({
  //   text: 'A note',
  //   completed: false
  // }, (err, result) => {
  //   if (err){
  //     return console.log('Unable to insert todo', err)
  //   }

  //   console.log(JSON.stringify(result.ops, undefined, 2))
  // })

  db.collection("Users").insertOne({
    name: "JD",
    age: 66,
    location: "World"
  },
  (err, result) => {
    if (err) {
      return console.log("Unable to insert user", err);
    }

    console.log(JSON.stringify(result.ops[0]._id.getTimestamp(), undefined, 2));
  });

  db.close();
});
