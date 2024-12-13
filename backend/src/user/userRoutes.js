const {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
  login,
} = require("./userController");
const router = require("express").Router();

router.get("/", getAllUsers);
router.post("/", createUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
router.post("/login", login)

module.exports = router;
