// JWT consists of Header, Payload and Signature
const jwt = require("jsonwebtoken");

// Middleware function for login related routes

const verifyToken = (req, res, next) => {
  //Extracts the JWT from the request headers.
  const token = req.header("auth-token");
  //If verification fails or the JWT is missing, it sends an unauthorized response.
  if (!token) {
    res.status(401).send({ error: "Please authenticate using a valid token" });
  }
  try {
    //Verifies the JWT's authenticity using a secret key.
    const data = jwt.verify(token, process.env.JWT_SECRET);
    //If verification is successful, it attaches the user's information (e.g., user ID) to the request object (req.user).
    req.user = data.user;
    // moves to next middleware in the stack
    next();
  } catch (error) {
    res.status(401).send({ error: "Please authenticate using a valid token" });
  }
};

module.exports = verifyToken;
