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
    const { corrected, changes, correction_count } = nlpResponse.data;

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
      session_id: sessionId
    });

  } catch (error) {
    console.error('Correction Error Detail:', {
      message: error.message,
      stack: error.stack,
      response: error.response?.data
    });
    
    if (error.code === 'ECONNREFUSED') {
      return res.status(503).json({ error: 'NLP service unavailable. Please ensure the Python service is running.' });
    }
    
    res.status(500).json({ 
      error: 'An error occurred during correction.',
      details: error.response?.data || error.message
    });
  }
});

module.exports = router;
