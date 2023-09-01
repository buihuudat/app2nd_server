const {
  updateAvatar,
  gets,
  get,
  update,
  deleteUser,
} = require("../../../controllers/userController");

const router = require("express").Router();

router.put(":id/update-avatar", updateAvatar);
router.get("/", gets);
router.get("/:id", get);

router.put("/:id/", update);

router.patch("/:id", deleteUser);

module.exports = router;
