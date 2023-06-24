const User = require("../models/mongoose/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const SignUp = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Este Usuario ya existe",
        error: err,
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(201).json({
      success: true,
      message: "El registro se realizo correctamente",
      data: newUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Hubo un error con el registro del usuario",
      error,
    });
  }
};

const Login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(401).json({
        success: false,
        message: "Credenciales invalidas",
        error,
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(401).json({
        success: false,
        message: "Credenciales invalidas",
        error,
      });
    }
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
      },
      process.env.JWT_KEY,
      { expiresIn: "10h" }
    );

    const data = {
      id: user._id,
      name: user.name,
      image: user.image,
      subscribed: user.subscribed,
      subscriptionPlan: user.subscriptionPlan,
      watchlist: user.watchlist,
      currentlyWatching: user.currentlyWatching,
      session_token: `JWT ${token}`,
    };
    return res.status(201).json({
      success: true,
      message: "El usuario fue autenticado",
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Hubo un error con el Login del usuario",
      error,
    });
  }
};

const getUser = async (req, res) => {
  try {
    const { user } = req.body;
    const newUser = await User.findById(user);
    if (newUser) {
      return res.status(201).json({
        id: newUser._id,
        name: newUser.name,
        image: newUser.image,
        subscribed: newUser.subscribed,
        subscriptionPlan: newUser.subscriptionPlan,
        watchlist: newUser.watchlist,
        currentlyWatching: newUser.currentlyWatching,
      });
    }
  } catch (error) {
    return res.status(501).json({
      success: false,
      message: "Hubo un error con al encontrar el usuario",
      error: err,
    });
  }
};

module.exports = {
  SignUp,
  Login,
  getUser,
};
