const Joi = require("joi");

const authSchema = Joi.object({
  phone: Joi.string()
    .lowercase()
    .pattern(/^09[0-9]{9}$/)
    .message(" شماره موبایل را با 0 و صحیح وارد کنید ")
    .required()
    .messages({
      "string.pattern": " شماره موبایل را با 0 و صحیح وارد کنید ",
      "string.empty": " شماره موبایل را با 0 و صحیح وارد کنید ",
    }),
});

const loginSchema = Joi.object({
  phone: Joi.string()
    .lowercase()
    .pattern(/^09[0-9]{9}$/)
    .message(" شماره موبایل را با 0 و صحیح وارد کنید ")
    .required()
    .messages({
      "string.pattern": " شماره موبایل را با 0 و صحیح وارد کنید ",
      "string.empty": " شماره موبایل را با 0 و صحیح وارد کنید ",
    }),
  code: Joi.number().allow().min(10000).max(90000).required().messages({
    "number.empty": "نوع ورود را وارد کن",
    "number.min": "نوع ورود را وارد کن",
    "number.max": "نوع ورود را وارد کن",
    "any.required": "نوع ورود را وارد کن",
    "number.base": "لطفا از کیبورد انگلسی استفاده کنید",
  }),
});

module.exports = { authSchema, loginSchema };
