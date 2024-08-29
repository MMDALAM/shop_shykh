const JWT = require("jsonwebtoken");
const createError = require("http-errors");
const { productModel } = require("../models/product");
const randomString = require("randomstring");

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

module.exports = { createCode, jwtSign, uniqueSlug };
