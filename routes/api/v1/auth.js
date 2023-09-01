const { body } = require("express-validator");
const { login, register } = require("../../../controllers/authController");
const validation = require("../../../ultis/handlers/validation");
const router = require("express").Router();
const User = require("../../../models/userModel");

router.post("/login", login);
router.post(
  "/register",
  body("msv").custom(async (msv) => {
    return await User.findOne({ msv }).then((user) => {
      if (user)
        return Promise.reject("Mã sinh viên đã được sử dụng để đăng ký");
    });
  }),
  body("email")
    .isEmail()
    .custom(async (email) => {
      return await User.findOne({ email }).then((user) => {
        if (user) {
          return Promise.reject("Email đã được sử dụng để đăng ký");
        }
      });
    }),
  body("phone").custom(async (phone) => {
    return await User.findOne({ phone }).then((user) => {
      if (user) {
        return Promise.reject("Số điện thoại đã được sử dụng để đăng ký");
      }
    });
  }),
  validation,
  register
);

module.exports = router;
