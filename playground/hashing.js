const { SHA256 } = require("crypto-js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

var password = "abcdefgh123";

// bcrypt.genSalt(10, (err, salt) => {
//   bcrypt.hash(password,salt, (err, hash) =>{
//     console.log(hash);
//   })
// })

var hashedPassword =
  "$2a$10$DM/1hUdVpGmWHEmTwVaDYe3GfkzxFelyJVZkua9MsTqjnss5szapu";

bcrypt.compare(password, hashedPassword, (err, result) => {
  console.log(result);
});

// var data = {
//   id: 10
// }

// var token = jwt.sign(data, 'somesecret')

// console.log(token)

// var decoded = jwt.verify(token, 'somesecret')

// console.log(decoded)

// const message = 'I am a message'
// var hash = SHA256(message)

// console.log(`Message: ${message}`)
// console.log(`Hash: ${hash}`)

// var data = {
//   id: 4
// }

// var token = {
//   data,
//   hash:SHA256(JSON.stringify(data) + 'somesecret').toString()
// }

// resultHash = SHA256(JSON.stringify(token.data) + 'somesecret').toString();

// if(resultHash === token.hash){
//   console.log('Data was not changed')
// }else{
//   console.log('Data was compromised')
// }
