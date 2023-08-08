const express = require('express');
const router = express.Router();
const { Spot } = require('../db/models');

// This route handler should be fine as it uses a middleware function
router.get('/', async (req, res) => {
  const spots = await Spot.findAll();
  res.json({message:'hello girl'});
});

module.exports = router;