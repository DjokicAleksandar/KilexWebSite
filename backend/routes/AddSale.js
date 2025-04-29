const DailySale = require("../models/DailySale.js");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const moment = require("moment");
const router = express.Router();

router.post('/add-sale', async (req, res) => {
    const productArray = req.body.products;
    const today = moment().format('DD-MM-YYYY');

    if (!Array.isArray(productArray) || productArray.length === 0) {
        return res.status(400).json({ message: "Nema proizvoda u narudžbini" });
    }

    try {
        let dailySale = await DailySale.findOne({ date: today })

        if (!dailySale) {
            dailySale = new DailySale({
                date: today,
                products: productArray
            })
        } else {
            productArray.forEach(element => {
                const existingProduct  = dailySale.products.find(p => p.name === element.name);

                if (existingProduct) {
                existingProduct.quantity += element.quantity;
                } else {
                dailySale.products.push(element);
                }
            })
        }

        await dailySale.save();
        res.status(200).json({ message: "Prodaja je sacuvana!" });
    } catch (error) {
        console.error("Greska prilikom pisanja u bazu ", error);
        res.status(500).json({ message: "Greska prilikom upisa u bazu" });
    }
});

module.exports = router;