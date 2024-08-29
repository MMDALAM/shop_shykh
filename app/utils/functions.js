const JWT = require("jsonwebtoken");
const createError = require("http-errors");
const { productModel } = require("../models/product");
const randomString = require("randomstring");
const fs = require("fs");
const path = require("path");

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

async function deleteFilePublic(fileAddress) {
  if (fileAddress) {
    const pathFile = path.join(__dirname, "..", "..", "public", fileAddress);
    if (fs.existsSync(pathFile)) fs.unlinkSync(pathFile);
  }
}

async function deleteLastFilePublic(fileAddress) {
  if (fileAddress) {
    fileAddress.forEach((Address) => {
      const pathFile = path.join(__dirname, "..", "..", "public", Address);
      if (fs.existsSync(pathFile)) fs.unlinkSync(pathFile);
    });
  }
}

module.exports = {
  createCode,
  jwtSign,
  uniqueSlug,
  deleteFilePublic,
  deleteLastFilePublic,
};
