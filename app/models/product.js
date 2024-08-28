const { default: mongoose } = require("mongoose");
const schema = mongoose.Schema;

const priceVariants = schema({
  priceVariants: {
    size: { type: String, required: true },
    color: { type: String, required: true },
    price: { type: Number, required: true },
  },
});

const user = schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    priceVariants: [priceVariants],
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    images: [{ type: String }],
  },
  { timestamp: true }
);

const userModel = mongoose.model("User", user);
module.exports = { userModel };
