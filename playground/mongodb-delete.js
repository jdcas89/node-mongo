const { MongoClient, ObjectID } = require('mongodb')

const dbName = 'TodoApp'
const mongoUrl = `mongodb://localhost:27017/${dbName}`

MongoClient.connect(mongoUrl, (err, db) => {
  if (err){
    return console.log('Unable to connect to MongoDB server')
  }
  console.log('Connected to MongoDB server')

  //

  /**
   *  deleteMany
   *  result object
   *  ok = means things went ok
   *  n = number of records that were deleted
   */ 
  // db.collection('Todos').deleteMany({text:'Buy headphones'}).then((result) => {
  //   console.log(result)
  // })


  /**
   *  deleteOne
   *  result object
   *  ok = means things went ok
   *  n = number of records that were deleted
   */ 
  // db.collection('Todos').deleteOne({text:'Buy headphones'}).then((result) => {
  //   console.log(result)
  // })

  /**
   *  findOneAndDelete
   *  lastErrorObject: { n: 1 }
   *  result = actual document
   */ 
  // db.collection('Todos').findOneAndDelete({completed: true}).then((result) => {
  //   console.log(result)
  // })


  // Challenge

  db.collection('Users').findOneAndDelete({_id: new ObjectID('59d467c153c509120ff1f846')}).then((result) => {
    console.log(result)
  })


  db.collection('Users').deleteMany({name: 'JD'}).then((result) => {
    console.log(result)
  })
 // db.close();
})