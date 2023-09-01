const User = require("../models/userModel");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

const config = process.env;

const authController = {
  login: async (req, res) => {
    const { phone, password } = req.body;

    try {
      const user = await User.findOne({ phone });
      if (!user)
        return res.status(404).json({
          errors: [
            {
              param: "phone",
              msg: "Số điện thoại không đúng hoặc chưa được đăng ký",
            },
          ],
        });

      const dessPass = CryptoJS.AES.decrypt(
        user.password,
        config.PASSWORD_SECRET_KEY
      ).toString(CryptoJS.enc.Utf8);

      if (dessPass !== password) {
        return res.status(400).json({
          errors: [
            {
              param: "password",
              msg: "Mật khẩu không hợp lệ",
            },
          ],
        });
      }

      const token = jwt.sign({ id: user._id }, config.TOKEN_SECRET_KEY, {
        expiresIn: "24h",
      });

      return res.status(200).json({ user: user.populate("-password"), token });
    } catch (error) {
      return res.status(500).json(error);
    }
  },

  register: async (req, res) => {
    const { password } = req.body;
    try {
      req.body.password = CryptoJS.AES.encrypt(
        password,
        config.PASSWORD_SECRET_KEY
      ).toString();

      const user = await User.create(req.body);
      const token = jwt.sign({ id: user._id }, config.TOKEN_SECRET_KEY, {
        expiresIn: "24h",
      });

      return res.status(201).json({ user: user.populate("-password"), token });
    } catch (error) {
      return res.status(500).json(error);
    }
  },
};

module.exports = authController;
