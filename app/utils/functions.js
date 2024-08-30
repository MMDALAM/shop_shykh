const JWT = require("jsonwebtoken");
const createError = require("http-errors");
const { productModel } = require("../models/product");
const randomString = require("randomstring");
const fs = require("fs");
const { default: mongoose } = require("mongoose");

function createCode() {
  return Math.floor(Math.random() * 90000 + 10000);
}

function jwtSign(userID) {
  return new Promise(async (resolve, reject) => {
    const payload = {
      userID: userID,
    };
    const options = {
      expiresIn: "6d",
    };
    JWT.sign(payload, "secret_key", options, (err, token) => {
      if (err) reject(createError.Unauthorized("خطا در شناسایی توکن"));
      resolve(token);
    });
  });
}

async function uniqueSlug() {
  let string = randomString.generate({ length: 6 });
  let product = await productModel.findOne({ slug: string });
  if (product) return uniqueSlug();
  return string;
}

async function deleteFilePublic(files) {
  const file = files?.map((file) => file.path);
  if (file) {
    file.forEach((image) => {
      if (fs.existsSync(image)) fs.unlinkSync(image);
    });
  }
}

async function deleteLastFilePublic(images) {
  if (images) {
    images.forEach((image) => {
      if (fs.existsSync(image)) fs.unlinkSync(image);
    });
  }
}

function mongoDBIdValidation(id) {
  if (!mongoose.Types.ObjectId.isValid(id))
    throw createError.BadRequest("ایدی ارسال شده صحیح نیمباشد");
  return true;
}

module.exports = {
  createCode,
  jwtSign,
  uniqueSlug,
  deleteFilePublic,
  deleteLastFilePublic,
  mongoDBIdValidation,
};
