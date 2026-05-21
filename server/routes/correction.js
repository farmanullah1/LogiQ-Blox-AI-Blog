const express = require('express');
const router = express.Router();
const axios = require('axios');
const Session = require('../models/Session');

const NLP_SERVICE_URL = process.env.NLP_SERVICE_URL || 'http://localhost:8000';

router.post('/', async (req, res) => {
  const { text, sessionId } = req.body;

  if (!text || typeof text !== 'string') {
    return res.status(400).json({ error: 'Text is required and must be a string.' });
  }

  if (text.length > 2000) {
    return res.status(400).json({ error: 'Text too long. Max 2000 characters.' });
  }

  try {
    // Forward to Python NLP service
    const nlpResponse = await axios.post(`${NLP_SERVICE_URL}/nlp/correct`, { text });
    const { corrected, changes, correction_count, insights } = nlpResponse.data;

    // Save to MongoDB
    const newSession = new Session({
      sessionId,
      originalText: text,
      correctedText: corrected,
      changes,
      correctionCount: correction_count
    });

    await newSession.save();

    res.json({
      original: text,
      corrected,
      changes,
      correction_count,
      insights,
      session_id: sessionId
    });

  } catch (error) {
    console.error('Correction Error Detail:', {
      message: error.message,
      response: error.response?.data
    });
    
    if (error.code === 'ECONNREFUSED') {
      return res.status(503).json({ error: 'NLP service unavailable. Please ensure the AI engine is running.' });
    }
    
    res.status(500).json({ error: 'An error occurred during text analysis.' });
  }
});

// Paraphrase route
router.post('/paraphrase', async (req, res) => {
  const { text, style } = req.body;

  try {
    const nlpResponse = await axios.post(`${NLP_SERVICE_URL}/nlp/paraphrase`, { text, style });
    res.json(nlpResponse.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to paraphrase text.' });
  }
});

module.exports = router;
