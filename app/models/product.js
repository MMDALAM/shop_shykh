const { default: mongoose } = require("mongoose");
const schema = mongoose.Schema;
const mongoosePaginate = require("mongoose-paginate-v2");

const priceVariants = new schema({
  size: { type: String, required: true },
  color: { type: String, required: true },
  price: { type: Number, required: true },
});

const productSchema = new schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true },
    description: { type: String, required: true },
    priceVariants: [priceVariants],
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    images: [{ type: String }],
    imagesUrl: [{ type: String }],
  },
  { timestamps: true }
);

productSchema.plugin(mongoosePaginate);

const productModel = mongoose.model("ProductSchema", productSchema);
module.exports = { productModel };
