const User = require("../models/users.models");
const jsonwebtoken = require("jsonwebtoken");
// a function to create a JSON web token
const createToken = (id) => {
  return jsonwebtoken.sign({ id },process.env.JWT_SECRET_KEY, { expiresIn: "1 days" });
};
const getAllUserController = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const loginUserController = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.loginUser(email,password)
    res.status(200).json({userName:user.userName});
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const signupUserController = async (req, res) => {
  const { userName, email, password } = req.body;
  try {
    const user = await User.signupUser(userName, email, password);
    const jsonWebToken = createToken(user._id);
    res.status(200).json({ userName: user.userName, jwt: jsonWebToken });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteUserController = async (req, res) => {
  const { id } = req.params;
  try {
    const userToDelete = await User.findByIdAndDelete(id);
    res.status(200).json(userToDelete);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  signupUserController,
  loginUserController,
  getAllUserController,
  deleteUserController,
};
