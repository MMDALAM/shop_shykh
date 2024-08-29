const { productModel } = require("../../../models/product");
const {
  uniqueSlug,
  deleteFilePublic,
  deleteLastFilePublic,
} = require("../../../utils/functions");
const controller = require("../controller");
const path = require("path");
const fs = require("fs");

class adminProductController extends controller {
  async createProduct(req, res, next) {
    try {
      let { title, description } = req.body;
      let priceVariants = this.priceVariants(req.body.priceVariants);
      const slug = await uniqueSlug();

      const images = req.files.map((file) => file.path);
      const imagesUrl = req.files.map(
        (file) =>
          `${req.protocol}://${req.get("host")}/uploads/${file.filename}`
      );

      const newProduct = new productModel({
        title,
        slug,
        description,
        priceVariants,
        owner: req.user.id,
        images,
        imagesUrl,
      });
      await newProduct.save();
      const user = req.user;
      user.products.push(newProduct.id);
      await user.save();
      return res.status(200).json({
        message: `لباس مورد نظر ' ${title} ' با موفقیت ذخیره شد`,
      });
    } catch (err) {
      deleteFilePublic(req.body.images);
      next(err);
    }
  }

  async editProduct(req, res, next) {
    try {
      const { id } = req.params;
      let { title, description } = req.body;
      let priceVariants = this.priceVariants(req.body.priceVariants);
      let product = await productModel.findById(id);
      let { images, imagesUrl } = product;

      if (req.files) {
        deleteLastFilePublic(product.images);
        images = req.files.map((file) => file.path);
        imagesUrl = req.files.map(
          (file) =>
            `${req.protocol}://${req.get("host")}/uploads/${file.filename}`
        );
      }

      let objUpdate = {};
      objUpdate.title = title;
      objUpdate.description = description;
      objUpdate.priceVariants = priceVariants.length
        ? priceVariants
        : product.priceVariants;
      objUpdate.images = images;
      objUpdate.imagesUrl = imagesUrl;

      const updateProduct = await productModel.findByIdAndUpdate(id, objUpdate);
      if (!!updateProduct.modifiedCount)
        return res.status(200).json({
          message: `لباس مورد نظر ' ${title} ' بروزرسانی نشده`,
        });

      return res.status(200).json({
        message: `لباس مورد نظر ' ${title} '  با موفقیت بروزرسانی شد`,
      });
    } catch (err) {
      next(err);
    }
  }

  async deleteProduct(req, res, next) {
    try {
      const { id } = req.params;
      let product = await productModel.findById(id);

      // deleteLastFilePublic(product.images);

      product.images.forEach((Address) => {
        console.log(Address);
        const pathFile = path.join(__dirname, "..", "..", "public", Address);
        console.log(fs.existsSync(pathFile));
        if (fs.existsSync(pathFile)) fs.unlinkSync(pathFile);
      });

      const deleteProduct = await productModel.findByIdAndDelete(id);
      if (!deleteProduct)
        return res.status(200).json({
          message: `لباس مورد نظر پیدا نشده`,
        });

      return res.status(200).json({
        message: `لباس مورد نظر  با موفقیت حذف شد`,
      });
    } catch (err) {
      next(err);
    }
  }

  async allProduct(req, res, next) {
    try {
      let options = {
        page: 1,
        limit: 5,
      };
      const products = await productModel.paginate(
        {},
        {
          options,
          populate: [{ path: "owner", select: "firstName" }],
        }
      );
      return res.status(200).json({
        products,
      });
    } catch (err) {
      next(err);
    }
  }

  async singleProduct(req, res, next) {
    try {
      const { id } = req.params;
      const product = await productModel
        .findById(id)
        .populate("owner", "firstName");
      return res.status(200).json({
        product,
      });
    } catch (err) {
      next(err);
    }
  }

  priceVariants(model) {
    let priceVariants = [];
    if (!model) return priceVariants;
    model.split("/").filter((key) => {
      let k = key.split(",");
      for (let i = 0; i < 1; i++) {
        priceVariants.push({
          size: k[i], // size
          color: k[i + 1], // color
          price: Number(k[i + 2]), // price
        });
      }
    });
    return priceVariants;
  }
}

module.exports = new adminProductController();
