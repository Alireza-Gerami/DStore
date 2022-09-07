const userModel = require("../model/model");
const bcrypt = require("bcryptjs");
const tokenGenerator = require("../../../utils/tokenGenerator");

const registerUser = async (input) => {
  const user = await userModel.findUser(
    { username: input.username },
    { _id: 0 }
  );
  if (user) {
    throw {
      status: 406,
      data: {
        message: "نام کاربری از قبل وجود دارد",
      },
    };
  }
  const salt = await bcrypt.genSalt(10);
  input.password = await bcrypt.hash(input.password, salt);
  await userModel.insertUser(input);
  delete input._id;
  delete input.password;
  return {
    status: 201,
    data: {
      message: "ثبت نام با موفقیت انجام شد",
      result: input,
    },
  };
};
const loginUser = async (input) => {
  const user = await userModel.findUser(
    { username: input.username },
    { _id: 0, products: 0 }
  );
  if (!user || !(await bcrypt.compare(input.password, user.password))) {
    throw {
      status: 404,
      data: {
        message: "نام کاربری یا رمز عبور نامعتبر است",
      },
    };
  }
  const accessToken = tokenGenerator.access(user.uid);
  const refreshToken = tokenGenerator.refresh(user.uid);

  delete user.password;
  return {
    status: 200,
    data: {
      message: "ورود با موفقیت انجام شد",
      result: user,
      accessToken: accessToken,
      refreshToken: refreshToken,
    },
  };
};
const updateUser = async (input) => {
  const user = await userModel.updateUser({ uid: input.uid }, input);
  return {
    status: 200,
    data: {
      message: "اطلاعات کاربر با موفقیت تغییر یافت",
      result: user,
    },
  };
};
const deleteUser = async (input) => {
  await userModel.deleteUser({ uid: input.uid });
  return {
    status: 200,
    data: {
      message: "کاربر با موفقیت حذف شد",
    },
  };
};
const getUser = async (input) => {
  const user = await userModel.findUser(
    { uid: input.uid },
    { _id: 0, password: 0 }
  );
  return {
    status: 200,
    data: {
      message: "اطلاعات کاربر با موفقیت دریافت شد",
      result: user,
    },
  };
};
module.exports = {
  registerUser,
  loginUser,
  updateUser,
  deleteUser,
  getUser,
};
