const express = require('express');
const router = express.Router();
const DailySale = require("../backend/models/DailySales.js");

// GET ruta za čitanje svih prodaja
router.get('/api/sales', async (req, res) => {
  if (!req.session.admin) {
    return res.status(401).json({ error: 'Nedozvoljen pristup' });
  }

  try {
    const sales = await DailySales.find().sort({ date: -1 });
    res.json(sales);
  } catch (err) {
    console.error('Greška:', err);
    res.status(500).json({ error: 'Greška na serveru' });
  }
});

module.exports = router;