const express = require("express");
const mongoose = require("mongoose");
const userRouter = express.Router();
const UsersModel = require("../models/Users");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')


userRouter.post("/register", async (req, res) => {
  const { username, password } = req.body;

  const userExists = await UsersModel.findOne({ username: username})

  if (userExists) {
    return res.status(400).json({ message: "User already existed"})
  } 

  const encryptedPassword = await bcrypt.hash(password, 10)

  const newUser = new UsersModel({ username: username, password: encryptedPassword})

  await newUser.save()

  res.json({ message: "Succeded"})

});

userRouter.post("/login", async ( req, res ) => {
  const { username, password } = req.body;

  const userExist = await UsersModel.findOne({ username: username });

  if (!userExist) {
    return res.status(404).json({ message: "The username does not exist yet, Please register"})
  }

  const passwordValid = await bcrypt.compare( password, userExist.password )

  if (passwordValid) {
    const token = jwt.sign({ id: userExist._id }, "secret");

    return res.json({ token: token, userID: userExist._id });
  } 

   return res.status(400).json({ message: "Password is incorrect"})

})

module.exports = userRouter;
