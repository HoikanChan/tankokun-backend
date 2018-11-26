const Promise = require('bluebird')
const bcrypt = Promise.promisifyAll(require('bcrypt-nodejs'))

function hashPassword(user, next) {
  const SALT_FACTOR = 8

  if (!user.isModified('password')) {
    return next()
  }

  return bcrypt
    .genSaltAsync(SALT_FACTOR)
    .then(salt => bcrypt.hashAsync(user.password, salt, null))
    .then(hash => {
      user.password = hash
      next()
    })
}

module.exports = mongoose => {
  const User = {
    model: null,
    name: 'User'
  }
  const schema = new mongoose.Schema({
    email: {
      type: String,
      unique: true
    },
    password: String,
    name: String
  })
  schema.pre('save', function (next) {
    var user = this
    hashPassword(user, next)
  })
  schema.methods.comparePassword = function (password, cb) {
    return bcrypt.compareAsync(password, this.password, function (err, isMatch) {
      if (err) return cb(err)
      cb(null, isMatch)
    })
  }

  // User.associate = function (models) {
  // }
  User.model = mongoose.model(User.name, schema)
  return User
}
