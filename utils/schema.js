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

module.exports = {
  userSchema,
  updateUserSchema,
};
