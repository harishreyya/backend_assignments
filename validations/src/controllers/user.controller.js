const express = require("express");
const { body, validationResult } = require("express-validator");

const User = require("../models/user.model");

const router = express.Router();

router.post(
  "/",
  body("first_name")
    .isLength({ min: 3, max: 20 })
    .withMessage(
      "First Name has to be at least 3 characters and maximum 20 characters"
    ),

    body("last_name")
    .isLength({ min: 3, max: 20 })
    .withMessage(
      "Last Name has to be at least 3 characters and maximum 20 characters"
    ),

    body("pincode")
    .isLength({ min: 6, max: 6 })
    .withMessage(
      " Pincode should be 6 digits"
    ),


  body("age").custom((value) => {
    // value = 1900
    const isNumber = /^[0-9]*$/.test(value); // true or false
    if (value > 100 || value < 1) {
      throw new Error("Age should be greater than 1 to 100");
    }
    return true;
  }),



  body("email").custom(async (value) => {
    // value = a@a.com
    const isEmail = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,20}$/.test(value);
    if (!isEmail) {
      throw new Error("Please enter a proper email address");
    }
    const userByEmail = await User.findOne({ email: value })
      .lean()
      .exec();
    if (userByEmail) {
      throw new Error("Already registered, please change email address");
    }
    return true;
  }),

  
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      let newErrors = errors.array().map(({ msg, param, location }) => {
        return {
          [param]: msg,
        };
      });
      return res.status(400).json({ errors: newErrors });
    }



    try {
      const user = await User.create(req.body);

      return res.status(201).json({ user });
    } catch (e) {
      return res.status(500).json({ status: "failed", message: e.message });
    }
  }
);

module.exports = router;