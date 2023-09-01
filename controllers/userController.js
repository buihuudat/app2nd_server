const User = require("../models/userModel");

const userController = {
  gets: async (req, res) => {
    try {
      const users = await User.find().populate("-password");
      return res.status(200).json(users);
    } catch (error) {
      return res.status(500).json(error);
    }
  },

  get: async (req, res) => {
    const { id } = req.params;
    try {
      const user = await User.findById(id).select("-password");
      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json(error);
    }
  },

  update: async (req, res) => {
    const { id } = req.params;

    try {
      const user = await User.findByIdAndUpdate(id, req.body, {
        new: true,
      }).select("-password");
      if (!user) return res.status(404).json("Không tìm thấy người đùng");
      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json(error);
    }
  },

  updateAvatar: async (req, res) => {
    const { id } = req.params;
    const { avatar } = req.body;
    try {
      const user = await User.findByIdAndUpdate(
        id,
        { avatar },
        { new: true }
      ).select("-password");
      if (!user) return res.status(404).json("Không tìm thấy người đùng");
      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json(error);
    }
  },

  deleteUser: async (req, res) => {
    const { id } = req.params;
    try {
      const user = await User.findByIdAndDelete(id);
      if (!user) return res.status(404).json("Không tìm thấy người đùng");
      return res.status(200).json(true);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
};

module.exports = userController;
