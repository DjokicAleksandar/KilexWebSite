const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const bodyParser = require("body-parser");
const router = express.Router();
// const moment = require("moment");

require("dotenv").config();

router.use(bodyParser.json({limit: "10mb"}));
router.use(bodyParser.urlencoded({extended: true}));

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

router.post("/send-email", async (req, res) => {
    const { formData, cartItems, today, pdf } = req.body; //i argsForPdf
      
    if (!formData.email || !formData.name || !formData.adress || !cartItems || cartItems.length === 0) {
      return res.status(400).json({ message: "Nedostaju podaci!" });
    }
  
    if (!isValidEmail(formData.email)) {
      return res.status(400).json({ success: false, message: "Pogresan format emaila"})
    }
  
    const date = `${today.day}. ${today.month}. ${today.year}`;
    let totalPrice = 0;
    let freeShipping = false;

    cartItems.forEach(item => {
        totalPrice += item.price * item.quantity;
    });

    for (const [key, value] of Object.entries(formData)) {
      if (typeof value === "string" && value.length > 200) {
        return res.status(400).json({
          message: `Polje "${key}" ima previše karaktera.`,
          messageId: 1,
        });
      }
    }

    if (totalPrice < 5000) {
      freeShipping = false;
      totalPrice += 249;
    } else {
      freeShipping = true;
    }
  
    // Kreiranje HTML sadrzaja za email
    const productList = cartItems
      .map((p) => `<tr> 
        <td style="text-align: left;"> <b> ${p.name} </b> </td> 
        <td style="text-align: center;"> <b> x ${p.quantity} - </b> </td>
        <td style="text-align: right;"> <b> ${p.price * p.quantity},00 RSD </b> <td> 
      </tr>`)
      .join("");
  
    const mailOptions = {
      from: `"Kilex - store" <${process.env.EMAIL_USER}>`,
      bcc: [formData.email, "kilexxx0@gmail.com"],
      subject: "Potvrda porudžbine",
      html: `
        <h2 style="color: black;">Pozdrav, ${formData.name}!</h2>
        <h3 style="color: black;">Hvala što ste poručili iz naše prodavnice. </h3>
        <h3 style="color: black;">Detalji porudžbine su: </h3>
        <table style="font-size: 20px; color: black;">${productList}</table>
        <p style="color: black;">Dostava: <strong> ${freeShipping ? "0" : "249,00"} RSD</strong></p>
        <p style="color: black;">Ukupna cena porudžbine: <strong> ${totalPrice},00 RSD</strong></p>
        <p style="color: black;">Vreme porudžbine: <strong> ${date}, ${today.time} </strong> </p>
        ${formData.note.trim() ? `<p style="color: black;">Napomena dostavljaču: <strong>${formData.note}</strong></p>` : ""}
        <h3 style="color: black;">Podaci o kupcu: </h3>
        <p style="color: black;">Ime i prezime: <strong>${formData.name} ${formData.lastName}</strong></p>
        <p style="color: black;">Email adresa: <strong>${formData.email}</strong></p>
        <p style="color: black;">Adresa dostave: <strong>${formData.adress}, ${formData.post} - ${formData.city}</strong></p>
        <p style="color: black;">Broj telefona: <strong>${formData.phone}</strong></p>
        <p style="color: black;">Vaša porudžbina će uskoro biti obrađena.</p>
      `,
      attachments: [
          {
              filename: "faktura.pdf",
              content: Buffer.from(pdf, "base64"),
              encoding: "base64",
          }
      ]
    };
  
    try {
      await transporter.sendMail(mailOptions);
      res.status(200).json({ success: true, message: "Email uspešno poslat!" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Greška pri slanju emaila." });
    }
});

module.exports = router;