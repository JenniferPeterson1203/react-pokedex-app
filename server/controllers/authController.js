const express = require("express");
const bcrypt = require("bcrypt");

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

    res.status(201).json(newUser);

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
      ✅ Successful login

      For now:
      return basic user data.

      Later:
      generate JWT token here.
    */
    res.status(200).json({
      id: user.id,
      username: user.username,
      email: user.email,
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