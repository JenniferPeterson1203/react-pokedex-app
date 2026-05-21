const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const {
  createUser,
  getUserByEmail,
} = require("../queries/usersQueries");

const auth = express.Router();

/*
  🔐 Signup Route

  Creates a new user account.

  Security Flow:
  1. Receive plain password from frontend
  2. Hash password with bcrypt
  3. Store ONLY hashed password in database
*/
auth.post("/signup", async (req, res) => {
  try {
    const {
      username,
      email,
      password,
    } = req.body;

    /*
  🛡️ Validate signup data

  This prevents empty or incomplete
  account data from reaching the database.
*/
if (!username || !email || !password) {
  return res.status(400).json({
    error: "username, email, and password are required",
  });
}


/*
  🔎 Check if email already exists
*/
const existingUser =
  await getUserByEmail(email);

if (existingUser) {
  return res.status(409).json({
    error: "Email already in use",
  });
}

/*
      🔒 Generate hashed password

      Salt rounds:
      Higher = more secure but slower.
      10 is a common balanced default.
    */
    const password_digest =
      await bcrypt.hash(password, 10);

    /*
      👤 Create secure user object
    */
    const newUser = await createUser({
      username,
      email,
      password_digest,
    });

    /*
  🪪 Generate JWT token after signup

  This lets a new user become logged in
  immediately after creating an account.
*/
const token = jwt.sign(
  {
    id: newUser.id,
    email: newUser.email,
  },
  process.env.JWT_SECRET,
  {
    expiresIn: "1h",
  }
);

res.status(201).json({
  token,
  user: newUser,
});

  } catch (error) {

    console.error(
      "Signup error",
      error
    );

    res.status(500).json({
      error: "Failed to create user",
    });
  }
});

/*
  🔓 Login Route

  Validates user credentials.
*/
auth.post("/login", async (req, res) => {
  try {
    const {
      email,
      password,
    } = req.body;

   /*
  🛡️ Validate login data

  Login needs both email and password
  before checking the database.
*/
if (!email || !password) {
  return res.status(400).json({
    error: "email and password are required",
  });
} 

    /*
      🔎 Find user by email
    */
    const user =
      await getUserByEmail(email);

    /*
      🚫 User not found
    */
    if (!user) {
      return res.status(401).json({
        error: "Invalid credentials",
      });
    }

    /*
      🔐 Compare entered password
      against stored bcrypt hash
    */
    const passwordsMatch =
      await bcrypt.compare(
        password,
        user.password_digest
      );

    /*
      🚫 Password mismatch
    */
    if (!passwordsMatch) {
      return res.status(401).json({
        error: "Invalid credentials",
      });
    }

/*
  🪪 Generate JWT token

  The token stores basic user identity
  information that can later be verified
  by protected backend routes.
*/
const token = jwt.sign(
  {
    id: user.id,
    email: user.email,
  },

  process.env.JWT_SECRET,

  {
    expiresIn: "1h",
  }
);

/*
  ✅ Successful authenticated login
*/
res.status(200).json({
  token,

  user: {
    id: user.id,
    username: user.username,
    email: user.email,
  },
});

  } catch (error) {

    console.error(
      "Login error",
      error
    );

    res.status(500).json({
      error: "Failed to login",
    });
  }
});

module.exports = auth;