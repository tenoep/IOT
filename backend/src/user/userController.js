const userService = require("./userService");
const logger = require("../logger");
const log = new logger.Logger("UserController");

// Get all users controller
const getAllUsers = async (req, res) => {
  log.info("Entering getAllUsers");
  try {
    const data = await userService.getAllUsers();
    return res.status(200).json(data);
  } catch (error) {
    log.error(`Error in getAllUsers: ${error.message}`);
    return res.status(500).json({ error: "Failed to fetch users" });
  }
};

// Create user controller
const createUser = async (req, res) => {
  log.info("Entering createUser");
  try {
    const data = await userService.createUser(req.body);
    return res.status(201).json(data);
  } catch (error) {
    log.error(`Error in createUser: ${error.message}`);
    return res.status(500).json({ error: error.message });
  }
};

// Update user controller
const updateUser = async (req, res) => {
  log.info("Entering updateUser");
  try {
    const data = await userService.updateUser(req.params.id, req.body);
    return res.status(200).json(data);
  } catch (error) {
    log.error(`${error.message}`);
    return res.status(500).json({ error: error.message });
  }
};

// Delete user controller
const deleteUser = async (req, res) => {
  log.info("Entering deleteUser");
  try {
    const data = await userService.deleteUser(req.params.id);
    return res.status(200).json(data);
  } catch (error) {
    log.error(`${error.message}`);
    return res.status(500).json({ error: error.message });
  }
};

const login = async (req, res) => {
  log.info("Entering login");
  try {
    const data = await userService.login(req.body)
    return res.status(200).json(data);
  } catch (error) {
    log.error(`${error.message}`)
    return res.status(500).json({ error: error.message });
  }
}

module.exports = {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
  login,
};
