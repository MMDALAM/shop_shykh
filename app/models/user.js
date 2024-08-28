const { default: mongoose } = require("mongoose");
const schema = mongoose.Schema;

const userSchema = new schema(
  {
    phone: { type: String, required: true, unique: true },
    otp: { type: Object, default: { code: 0, expiresIn: 0 } },
    roles: { type: [String], default: ["ADMIN"] },
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
  },
  { timestamp: true }
);

const userModel = mongoose.model("User", userSchema);
module.exports = { userModel };
