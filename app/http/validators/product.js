const Joi = require("joi");

const productSchema = Joi.object({
  title: Joi.string().min(2).max(30).required().messages({
    "string.empty": " لطفا عنوان را وارد کنید ",
    "string.min": " لطفا عنوان را بیشتر از 2 کاراکتر وارد کنید ",
    "string.max": " لطفا عنوان را کمتر از 30 کاراکتر وارد کنید ",
  }),
  description: Joi.string().min(5).max(200).required().messages({
    "string.empty": " لطفا توضیحات را وارد کنید ",
    "string.min": " لطفا توضیحات را بیشتر از 5 کاراکتر وارد کنید ",
    "string.max": " لطفا توضیحات را کمتر از 200 کاراکتر وارد کنید ",
  }),
  priceVariants: Joi.string().required().messages({
    "string.empty": " لطفا مشخصات را وارد کنید ",
  }),
  fileName: Joi.string()
    .regex(/(\.png|\.jpg|\.webp|\.jpeg|\.gif)$/)
    .message(" شماره موبایل را با 0 و صحیح وارد کنید "),
  fileUploadPath: Joi.allow(),
});

const editProductSchema = Joi.object({
  title: Joi.string().min(2).max(30).required().messages({
    "string.empty": " لطفا عنوان را وارد کنید ",
    "string.min": " لطفا عنوان را بیشتر از 2 کاراکتر وارد کنید ",
    "string.max": " لطفا عنوان را کمتر از 30 کاراکتر وارد کنید ",
  }),
  description: Joi.string().min(5).max(200).required().messages({
    "string.empty": " لطفا توضیحات را وارد کنید ",
    "string.min": " لطفا توضیحات را بیشتر از 5 کاراکتر وارد کنید ",
    "string.max": " لطفا توضیحات را کمتر از 200 کاراکتر وارد کنید ",
  }),
  priceVariants: Joi.string().required().messages({
    "string.empty": " لطفا مشخصات را وارد کنید ",
  }),
  fileName: Joi.string()
    .regex(/(\.png|\.jpg|\.webp|\.jpeg|\.gif)$/)
    .message(" شماره موبایل را با 0 و صحیح وارد کنید "),
  fileUploadPath: Joi.allow(),
});

module.exports = { productSchema, editProductSchema };
