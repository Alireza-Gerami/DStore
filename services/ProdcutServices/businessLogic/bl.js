const productModel = require("../model/model");

const createProduct = async (input) => {
  await productModel.insertProduct(input);
  delete input._id;
  return {
    status: 201,
    data: {
      message: "محصول با موفقیت ثبت شد",
      result: input,
    },
  };
};
const updateProduct = async (input) => {
  const product = await productModel.updateProduct({ pid: input.pid }, input);
  if (!product) {
    throw {
      status: 404,
      data: {
        message: "محصول یافت نشد",
      },
    };
  }
  return {
    status: 200,
    data: {
      message: "اطلاعات محصول با موفقیت تغییر یافت",
      result: product,
    },
  };
};
const deleteProduct = async (input) => {
  const deleted = await productModel.deleteProduct({ pid: input.pid });
  if (deleted.deletedCount === 0) {
    throw {
      status: 404,
      data: {
        message: "محصول یافت نشد",
      },
    };
  }
  return {
    status: 200,
    data: {
      message: "محصول با موفقیت حذف شد",
    },
  };
};
const getProduct = async (input) => {
  const product = await productModel.findProduct(
    { pid: input.pid, uid: input.uid },
    { _id: 0 }
  );
  if (!product) {
    throw {
      status: 404,
      data: {
        message: "محصول یافت نشد",
      },
    };
  }
  return {
    status: 200,
    data: {
      message: "اطلاعات محصول با موفقیت دریافت شد",
      result: product,
    },
  };
};
const getProducts = async (input) => {
  const products = await productModel.findProducts(
    { uid: input.uid },
    { _id: 0 }
  );
  if (products.length === 0) {
    throw {
      status: 404,
      data: {
        message: "محصولی یافت نشد",
      },
    };
  }
  return {
    status: 200,
    data: {
      message: "اطلاعات محصولات کاربر با موفقیت دریافت شد",
      result: products,
    },
  };
};

module.exports = {
  createProduct,
  updateProduct,
  deleteProduct,
  getProduct,
  getProducts,
};
