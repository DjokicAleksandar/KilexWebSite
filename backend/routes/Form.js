const DailySale = require("../models/DailySale");
const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const cors = require("cors");

require("dotenv").config();

router.use(cors());
router.use(express.json());

const FORM = process.env.FORM;
const SECRET_KEY = process.env.SECRET_KEY;

function authenticateToken(req, res, next) {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(403).json({ message: "Pristup odbijen" });
  }

  jwt.verify(token.split(" ")[1], SECRET_KEY, (err, decoded) => {
    if (err) return res.status(403).json({ message: "Nevažeći token" });

    req.admin = decoded.admin;
    next();
  });
}

router.get(FORM, authenticateToken, async (req, res) => {
  try {
    const allSales = await DailySale.find({});
    res.json(allSales);
  } catch (error) {
    console.error("Greska prilikom ucitavanja podataka iz baze: ", error);
    res.status(500).json({ message: "Greska prilikom ucitavanja podataka iz baze" })
  }
})

module.exports = router;