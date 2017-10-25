const { MongoClient, ObjectID } = require("mongodb");

const dbName = "TodoApp";
const mongoUrl = `mongodb://localhost:27017/${dbName}`;

MongoClient.connect(mongoUrl, (err, db) => {
  if (err) {
    return console.log("Unable to connect to MongoDB server");
  }
  console.log("Connected to MongoDB server");

  /**
   * findOneAndUpdate
   * use mongodb operators
   */

  // db.collection('Todos').findOneAndUpdate({
  //   _id: new ObjectID('59d5b3cc2a177001eb1d584f')
  // }, {
  //   $set: {
  //     text: 'Text headphones',
  //     completed: true
  //   }
  // },{
  //   returnOriginal: true
  // }).then((result) => {
  //   console.log(result)
  // })

  db
    .collection("Users")
    .findOneAndUpdate(
      {
        _id: new ObjectID("59d4685d7428fd12238de554")
      },
      {
        $set: {
          name: "Juan"
        },
        $inc: {
          age: 1
        }
      },
      {
        returnOriginal: true
      }
    )
    .then(result => {
      console.log(result);
    });

  // db.close();
});
