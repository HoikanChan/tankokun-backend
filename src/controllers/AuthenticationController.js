const { User } = require('../models')
const jwt = require('jsonwebtoken')
const config = require('../config/config')
const sendResult = require('../utils/sendResult')
function jwtSignUser(user) {
  const ONE_WEEK = 60 * 60 * 24 * 7
  return jwt.sign(user, config.authentication.jwtSecret, {
    expiresIn: ONE_WEEK
  })
}

module.exports = {
  async register(req, res) {
    try {
      const user = await User.create(req.body)
      const userJson = user.toJSON()
      debugger
      sendResult.success(res, {
        user: userJson,
        token: jwtSignUser(userJson)
      })
    } catch (err) {
      console.log(err)
      sendResult.error(res, err)
    }
  },
  async login(req, res) {
    try {
      const { email, password } = req.body
      const user = await User.findOne({ 'email': email }, function (err, user) {
        if (err) throw err
        if (!user) {
          throw 'The login information was incorrect'
        }
        // test a matching password
        user.comparePassword(password, function (err, isMatch) {
          if (err) throw err
          if (!isMatch) {
            throw 'The login information was incorrect'
          }
        })
      })

      const userJson = user.toJSON()
      sendResult.success({
        user: userJson,
        token: jwtSignUser(userJson)
      })
    } catch (err) {
      sendResult.error(res, err)
    }
  }
}
