const express = require('express');
const router = express.Router();
const Session = require('../models/Session');

// Get history for a session
router.get('/:sessionId', async (req, res) => {
  try {
    const history = await Session.find({ sessionId: req.params.sessionId })
      .sort({ createdAt: -1 })
      .limit(20);
    res.json(history);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch history.' });
  }
});

// Delete history for a session
router.delete('/:sessionId', async (req, res) => {
  try {
    await Session.deleteMany({ sessionId: req.params.sessionId });
    res.json({ message: 'History cleared successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to clear history.' });
  }
});

module.exports = router;
