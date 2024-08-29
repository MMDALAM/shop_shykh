const JWT = require("jsonwebtoken");
const createError = require("http-errors");

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

module.exports = { createCode, jwtSign };
