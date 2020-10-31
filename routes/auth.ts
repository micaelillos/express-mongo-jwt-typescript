import express = require('express');
import User from '../models/User';
import jwt from 'jsonwebtoken';
const router = express.Router();
const { registerValidation, loginValidation } = require('../validation.ts');
import bcrypt from 'bcryptjs';
// Routes
router.post('/register', async (req, res) => {
  //  Lets Validate The Data Before We Add A User
  const { name, email, password } = req.body;
  const notValid = await registerValidation(req.body);
  if (notValid) return res.status(404).send(notValid.message);
  //Check if user is already in the database
  const emailExist = await User.findOne({ email });
  if (emailExist) return res.status(400).send(`Email ${email} already exists`);

  // Hash Passwords
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  const user = new User({
    name,
    email,
    password: hashPassword,
  });
  try {
    const savedUser = await user.save();
    res.send({ message: 'User Succesfully Registred', savedUser });
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post('/login', async (req, res) => {
  //  Lets Validate The Data Before We Add A User
  const { email, password } = req.body;
  const notValid = await loginValidation(req.body);
  if (notValid) return res.status(404).send(notValid.message);
  // Check if emails exists in the database
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: `Email is not found` });
  // Check if password is correct
  const validPass = await bcrypt.compare(password, user.password);
  if (!validPass) return res.status(400).json({ message: `Invalid password` });

  // Create and assign a token
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET ?? '');
  res.header('auth-token', token).send(token);
});

module.exports = router;
