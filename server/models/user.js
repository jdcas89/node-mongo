const mongoose = require('mongoose')
const validator = require('validator')
const jwt = require('jsonwebtoken')
const _ = require('lodash')

var UserSchema = new mongoose.Schema({
  email: {
    type:String,
    required:true,
    trim:true,
    minlength:1,
    unique:true,
    validate:{
      validator: value => validator.isEmail(value),
      message: '{VALUE} is not a valid email.'
    }
  },
  password:{
    type:String,
    required:true,
    minlength:6
  },
  tokens:[{
    access:{
      type:String,
      required:true,
    },
    token:{
      type:String,
      required:true,
    }
  }]
})



// var User = mongoose.model('User', {
//   email: {
//     type:String,
//     required:true,
//     trim:true,
//     minlength:1,
//     unique:true,
//     validate:{
//       validator: (value) => {
//         return validator.isEmail(value)
//       },
//       message: '{VALUE} is not a valid email.'
//     }
//   }
// })

UserSchema.methods.toJSON = function(){
  var user = this
  var userObject = user.toObject();
  return _.pick(userObject, ['_id', 'email'])
}

UserSchema.methods.generateAuthToken = function() {
  var user = this
  var access = 'auth'
  var token = jwt.sign({_id:user._id.toHexString(),access}, 'somesecretvalue').toString()

  user.tokens.push({access,token})
  return user.save().then(() => {
    return token
  })
}

UserSchema.statics.findByToken = function(token) {
  var User = this;

  var decoded;

  try {
    decoded = jwt.verify(token, 'somesecretvalue')
  } catch (error) {
    // return new Promise((resolve, reject) => {
    //    reject()
    // })
    return Promise.reject(error)
  }

  return User.findOne({
    '_id': decoded._id,
    'tokens.token': token,
    'tokens.access': 'auth'
  })
}

var User = mongoose.model('User', UserSchema)

module.exports = {User}