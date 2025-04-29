const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const cors = require("cors");

require("dotenv").config();

const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const SECRET_KEY = process.env.SECRET_KEY;
const LOGIN = process.env.LOGIN;

router.post(LOGIN, (req, res) => {
  const {userName, password} = req.body;
  console.log(userName + " " + password);

  if (userName == ADMIN_EMAIL && password == ADMIN_PASSWORD) {
    const token = jwt.sign({ admin: true }, SECRET_KEY, { expiresIn: "1h" });
    return res.json({ success: true, token});
  } else {
    return res.status(401).json({ success: false, message: "Pogresan email ili lozinka" });
  }
});

module.exports = router;