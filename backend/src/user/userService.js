const User = require("../models/userModel");
const logger = require("../logger");
const { json } = require("express");
const log = new logger.Logger("UserService");

const getAllUsers = async () => {
  log.info("Entering getAllUsers");
  try {
    const data = await User.find();
    return data;
  } catch (error) {
    log.error(`Error in getAllUsers: ${error.message}`);
    throw new Error(`Error in getAllUsers: ${error.message}`);
  }
};

const createUser = async (userData) => {
  log.info("Entering createUser :");
  try {
    if (!userData.role)
      userData.role = "user"
    const user = new User(userData);
    console.log(user)
    
    await user.save();
    return user;
  } catch (error) {
    log.error(`Error in createUser: ${error.message}`);
    throw new Error(`Error in createUser: ${error.message}`);
  }
};

const updateUser = async (id, userData) => {
  log.info("Entering updateUser");
  try {
    const user = await User.findByIdAndUpdate(id, userData, { new: true });
    return user;
  } catch (error) {
    log.error(`Error in updateUser: ${error.message}`);
    throw new Error(`Error in updateUser: ${error.message}`);
  }
};

const deleteUser = async (id) => {
  log.info("Entering deleteUser");
  try {
    const user = await User.findByIdAndDelete(id);
    return user;
  } catch (error) {
    log.error(`Error in deleteUser: ${error.message}`);
    throw new Error(`Failed to delete user : ${error.message}`);
  }
};

const login = async (data) => {
  log.info("Entering login");
  try {
    const dataWithEmail = { email: data.login, password: data.password}
    const userEmail = await User.find(dataWithEmail)
    console.log(userEmail)
    if (userEmail == ""){
      console.log("no email")
      const userLogin = await User.find(data)
      if (userLogin == ""){
        console.log("no login")

      } else {
        console.log(userLogin[0])
        return {"role": userLogin[0].role, "_id":userLogin[0]._id, "login":userLogin[0].login}
      }
    } else {
      console.log(userEmail[0])
      return {"role": userEmail[0].role, "_id":userEmail[0]._id, "login":userEmail[0].login}
    }
    return {"role": "userNotFound"}
  } catch (error) {
    log.error(`Error in Login: ${error.message}`);
    throw new Error(`Error in Login: ${error.message}`);
  }
};

module.exports = {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
  login,
};
