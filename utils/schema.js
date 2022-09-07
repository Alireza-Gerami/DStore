const Yup = require("yup");

const userSchema = Yup.object().shape({
  username: Yup.string()
    .required("نام کاربری الزامی است")
    .min(6, "طول نام کاربری باید بیشتر از ۶ حرف باشد"),
  password: Yup.string()
    .required("رمز عبور الزامی است")
    .min(8, "طول رمز عبور باید بیشتر از ۸ حرف باشد"),
});
const updateUserSchema = Yup.object().shape({
  username: Yup.string()
    .required("نام کاربری الزامی است")
    .min(6, "طول نام کاربری باید بیشتر از ۶ حرف باشد"),
});

const productSchema = Yup.object().shape({
  name: Yup.string().required("نام محصول الزامی است"),
  price: Yup.number()
    .required("قیمت محصول الزامی است")
    .min(0, "قیمت محصول نمی‌تواند منفی باشد"),
  quantity: Yup.number()
    .required("تعداد محصول الزامی است")
    .min(0, "تعداد محصول نمی‌تواند منفی باشد"),
});
module.exports = {
  userSchema,
  updateUserSchema,
  productSchema,
};
