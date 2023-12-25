const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const verifyToken = require("../middleware/verifyToken");

// JWT consists of Header, Payload and Signature.
// Signature is used to check authentication of user i.e jwt hasn't altered by someeone

// This function generateJWT takes user data (typically containing the user's ID) as an argument, constructs a JWT payload containing the user ID, and signs it using the secret key, creating a JWT.//
const generateJWT = (userData) => {
  const data = {
    user: {
      id: userData.id,
    },
  };
  return jwt.sign(data, process.env.JWT_SECRET);
};

// Create signup route: With Express-Validation
// POST "/api/auth/signup"
router.post(
  "/signup",
  [
    // Express-validations
    body("name", "Enter valid name.").isLength({ min: 3 }),
    body("email", "Enter valid email.").isEmail(),
    body("password", "Password must be atleast 8 characters.").isLength({
      min: 8,
    }),
  ],
  // Express-Validation Data Display
  async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    // If errs return bad request and the errs
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }
    try {
      // Check if user already exists
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ success, error: "User with this email already exists" });
      }

      //Using bcrypt to hash and salt passwords
      const salt = await bcrypt.genSalt(10);
      const securePass = await bcrypt.hash(req.body.password, salt);

      // Otherwise Create user using User Schema Model as instance in db
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: securePass,
      });

      // call the generateJWT function with the user data and obtain a JWT, which is then sent back to the client as part of the API response.
      const authToken = generateJWT(user);
      console.log(authToken);
      success = true;
      res.json({ success, authToken });

      //
    } catch (error) {
      //Catch unwanted errors
      console.error(error.message);
      res.status(500).json("Interval server error");
    }
  }
);

// Login route: With Express-Validation
// POST "/api/auth/login"
router.post(
  "/login",
  [
    // Express-validations
    body("email", "Enter valid email.").isEmail(),
    body("password", "Password must be atleast 5 characters.").isLength({
      min: 1,
    }),
  ],
  // Express-Validation Data Display
  async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    // If errs return bad request and the errs
    if (!errors.isEmpty()) {
      res.status(400).json({ success, errors: errors.array() });
    }

    // Use destructing to extract email and password from req.body
    const { email, password } = req.body;
    try {
      // Find user and return error if not found
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ success, error: "User Not Found" });
      }
      // Compare typed password with saved user password and return error if doesn't match
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res.status(400).json({ success, error: "Incorrect Password" });
      }

      // call the generateJWT function with the user data and obtain a JWT, which is then sent back to the client as part of the API response.
      const authToken = generateJWT(user);
      console.log(authToken);
      success = true;
      res.json({ success, authToken });

      //
    } catch (error) {
      //Catch unwanted errors
      console.error(error.message);
      res.status(500).json("Interval server error");
    }
  }
);

// Get Loggedin user details route:
// POST "/api/auth/getuser"
router.post("/getuser", verifyToken, async (req, res) => {
  try {
    // Store user.id from verifyToken middleware in userId
    userId = req.user.id;
    // Find user by Id and exclude passowrd, because we don't want to send password in user details to client
    const user = await User.findById(userId).select("-password");
    // Send user details without passowrd
    res.send(user);
  } catch (error) {
    //Catch unwanted errors
    console.error(error.message);
    res.status(500).json("Interval server error");
  }
});

module.exports = router;
