const { userModel } = require("../../../models/user");
const { createCode, jwtSign } = require("../../../utils/functions");
const { authSchema, loginSchema } = require("../../validators/auth");
const controller = require("../controller");
const createError = require("http-errors");

class auth extends controller {
  async auth(req, res, next) {
    try {
      await authSchema.validateAsync(req.body);
      const { phone } = req.body;
      const code = createCode();
      const user = await this.checkExistUser(phone);
      let otp = {
        code,
        expiresIn: new Date().getTime() + 120000,
      };
      if (!user) await this.registerUser(phone, code);
      else await this.updateUser(phone, { otp });

      return res.status(200).json({
        sms: ` کد را وارد کنید ${code}`,
      });
    } catch (err) {
      next(err);
    }
  }

  async registerUser(phone, code) {
    let otp = {
      code,
      expiresIn: new Date().getTime() + 120000,
    };
    const newUser = new userModel({
      phone,
      otp,
    });
    return await newUser.save();
  }

  async login(req, res, next) {
    try {
      await loginSchema.validateAsync(req.body);
      const { phone, code } = req.body;
      const user = await userModel.findOne({ phone });
      if (!user) createError.Unauthorized("کاربر مورد نظر پیدا نشد");
      this.validatorCode(user, code);
      const token = await jwtSign(user._id);
      return res.status(201).json({
        token: token,
        message: "لطفا توکن در هدرز قرار دهید",
      });
    } catch (err) {
      next(err);
    }
  }

  validatorCode(user, code) {
    const now = Date.now();

    if (+user.otp.expiresIn < now)
      throw createError.Unauthorized(" کد وارد شده منقضی شده");

    if (user.otp.code != code)
      throw createError.Unauthorized("کد ارسال شده صحیح نمیباشد");
  }

  async checkExistUser(phone) {
    const user = await userModel.findOne({ phone });
    if (user) return true;
    return false;
  }

  async updateUser(phone, objectData = {}) {
    const updateResult = await userModel.updateOne(
      { phone },
      { $set: objectData }
    );
    return !!updateResult.modifiedCount;
  }
}

module.exports = new auth();
