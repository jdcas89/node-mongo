const { SHA256 } = require('crypto-js')
const jwt = require('jsonwebtoken')

var data = {
  id: 10
}

var token = jwt.sign(data, 'somesecret')

console.log(token)

var decoded = jwt.verify(token, 'somesecret')

console.log(decoded)

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



