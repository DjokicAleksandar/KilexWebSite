const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();

require("dotenv").config();

const LOGOUT = process.env.LOGOUT;

router.post(LOGOUT, (req, res) => {
    res.json({ success: true });
})

module.exports = router;