const JWT = require("jsonwebtoken");
const createError = require("http-errors");
const { userModel } = require("../../models/user");

function getToken(headers) {
  let [Bearer, token] = headers?.authorization?.split(" ") || [];
  if (token && [Bearer, token].includes(Bearer)) return token;
  else return createError.Unauthorized("حساب کاربری یافت نشد");
}

function verifyToken(req, res, next) {
  const token = getToken(req.headers);
  JWT.verify(token, "secret_key", async (err, payload) => {
    if (err) return next(createError.Unauthorized("توکن مورد نظر یافت نشد"));
    const { userID } = payload;
    const user = await userModel.findById(userID);
    if (!user) return next(createError.Unauthorized("کاربر مورد نظر یافت نشد"));
    req.user = user;
    return next();
  });
}

module.exports = { verifyToken };
