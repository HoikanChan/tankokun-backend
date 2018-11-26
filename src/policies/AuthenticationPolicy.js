const Joi = require('joi')
module.exports = {
  register (req, res, next) {
    const schema = {
      email: Joi.string().email(),
      password: Joi.string().regex(new RegExp('^[a-zA-z0-9]{6,32}$')),
      name: Joi.string().regex(new RegExp('^*{3,32}$'))
    }
    const { error, value } = Joi.validate(req.body, schema)
    if (error) {
      switch (error.details[0].context.key) {
        case 'email':
          res.status(400).send({
            error: 'You must provide a valid email address'
          })
          break
        case 'password':
          res.status(400).send({
            error:
              'The password  provided failed to much the following rules belo<br> 1. It must contail ONLY the following characters:lower case ,upper case and number.<br>2.It must be at least 8 charaters in length and not greaters than 32 characters'
          })
          break
        default:
          res.status(400).send({
            error: 'Invalid fail'
          })
      }
    } else {
      next()
    }
  }
}
