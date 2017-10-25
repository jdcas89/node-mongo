const { MongoClient, ObjectID } = require("mongodb");

const dbName = "TodoApp";
const mongoUrl = `mongodb://localhost:27017/${dbName}`;

MongoClient.connect(mongoUrl, (err, db) => {
  if (err) {
    return console.log("Unable to connect to MongoDB server");
  }
  console.log("Connected to MongoDB server");

  // db.collection('Todos').find({completed: false}).toArray().then((docs) => {
  //   console.log('Todos')
  //   console.log(JSON.stringify(docs, undefined, 2))
  // }, (err) =>{
  //   console.log('Unable to fetch todos', err)
  // })

  // db.collection('Todos').find({_id: new ObjectID('59d4675e6845bf1209a6bfe9')}).toArray().then((docs) => {
  //   console.log('A specific todo note using ObjectID')
  //   console.log(JSON.stringify(docs, undefined, 2))
  // }, (err) =>{
  //   console.log('Unable to fetch todos', err)
  // })

  // db.collection('Todos').find().count().then((count) => {
  //   console.log('A counter of objects')
  //   console.log(`Todos count: ${count}`)
  // }, (err) =>{
  //   console.log('Unable to fetch todos', err)
  // })

  db
    .collection("Users")
    .find({ name: "test" })
    .toArray()
    .then(
      docs => {
        console.log("Print documents with name test");
        console.log(JSON.stringify(docs, undefined, 2));
      },
      err => {
        console.log("Unable to fetch todos", err);
      }
    );
});
