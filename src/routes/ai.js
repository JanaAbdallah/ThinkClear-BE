const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const aiService = require('../utils/aiService');

// Test AI service endpoint
router.post('/test', auth, async (req, res) => {
  try {
    const { text } = req.body;
    const result = await aiService.processText(text);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;