const jwt = require("jsonwebtoken");

/*
  🔐 JWT Verification Middleware

  This middleware protects routes by verifying:
  - token exists
  - token is valid
  - token was signed with our secret
*/
const verifyToken = (req, res, next) => {

  /*
    📨 Read authorization header

    Expected format:
    Authorization: Bearer TOKEN
  */
  const authHeader =
    req.headers.authorization;

  /*
    🚫 Missing token
  */
  if (!authHeader) {
    return res.status(401).json({
      error: "Access denied",
    });
  }

  /*
    ✂️ Extract token from:
    "Bearer TOKEN"
  */
  const token =
    authHeader.split(" ")[1];

  try {

    /*
      🔍 Verify token authenticity
    */
    const decoded =
      jwt.verify(
        token,
        process.env.JWT_SECRET
      );

    /*
      👤 Attach decoded user info
      to request object
    */
    req.user = decoded;

    /*
      ✅ Continue to protected route
    */
    next();

  } catch (error) {

    /*
      🚫 Invalid or expired token
    */
    return res.status(403).json({
      error: "Invalid token",
    });
  }
};

module.exports = verifyToken;