const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  rawText: {
    type: String,
    required: true
  },
  cleanText: {
    type: String,
    required: true
  },
  keywords: [{
    type: String
  }],
  category: {
    type: String,
    enum: ['Work', 'Personal', 'Ideas', 'Learning', 'Meeting', 'Task', 'Other'],
    default: 'Other'
  },
  subcategory: {
    type: String,
    default: ''
  },
  theme: {
    type: String,
    default: 'blue'
  },
  icon: {
    type: String,
    default: '📝'
  },
  visualData: {
    type: Object,
    default: {}
  },
  aiInsight: {
    type: String,
    default: ''
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Index for search
noteSchema.index({ cleanText: 'text', keywords: 'text' });

module.exports = mongoose.model('Note', noteSchema);
