const Joi = require("joi");
const sendResult = require("../utils/sendResult");

module.exports = {
  register(req, res, next) {
    const schema = {
      email: Joi.string().email(),
      password: Joi.string().regex(new RegExp("^[a-zA-z0-9]{6,32}$")),
      name: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required()
    };
    const { error, value } = Joi.validate(req.body, schema);
    if (error) {
      let errorText = "";
      switch (error.details[0].context.key) {
        case "email":
          errorText = "You must provide a valid email address";
          break;
        case "password":
          errorText =
            "The password provided failed to much the following rules belo<br> 1. It must contail ONLY the following characters:lower case ,upper case and number.<br>2.It must be at least 8 charaters in length and not greaters than 32 characters";
          break;
        case "name":
          errorText =
            "The username must be at least 3 charaters in length and not greaters than 30 characters";
          break;
        default:
          errorText = "Invalid fail";
      }
      sendResult.error(res, errorText);
    } else {
      next();
    }
  }
};
