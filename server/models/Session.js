const mongoose = require('mongoose');

const SessionSchema = new mongoose.Schema({
  sessionId: {
    type: String,
    required: true,
    index: true
  },
  originalText: {
    type: String,
    required: true
  },
  correctedText: {
    type: String,
    required: true
  },
  changes: {
    type: Array,
    default: []
  },
  correctionCount: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Session', SessionSchema);
