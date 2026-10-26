import User from "../models/userModels.js";
import bcrypt from "bcryptjs";
import createToken from "../utils/createToken.js";

const createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // validation
    if (!username || !email || !password) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }

    // check existing user
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ message: "User already exists" });
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create user (User.create automatically saves to MongoDB)
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    createToken(res, newUser._id);
    // Send success response
    return res.status(201).json({
      message: "User registered successfully",
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
      },
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const currentUser = await User.findOne({ email });
  if (currentUser && (await bcrypt.compare(password, currentUser.password))) {
    createToken(res, currentUser._id);
    return res.status(200).json({
      _id: currentUser._id,
      username: currentUser.username,
      email: currentUser.email,
    });
  }
  return res.status(400).send("Invalid credentials");
};
const logoutUser = async (req, res) => {
  res.cookie("jwt", "", { httpOnly: true, expires: new Date(0) });
  return res.status(200).json({
    message: "logged out successfully",
  });
};
const profilePage = async (req, res) => {
  if (req.user) {
    return res.json({
      _id: req.user._id,
      username: req.user.username,
      email: req.user.email,
    });
  }
  return res.status(404).send("User not found");
};

export { createUser, loginUser, logoutUser, profilePage };
