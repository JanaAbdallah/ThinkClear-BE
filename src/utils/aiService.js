const axios = require('axios');

const AI_SERVICE_URL = process.env.AI_SERVICE_URL || 'http://localhost:8000';

class AIService {
  async processText(rawText) {
    try {
      const response = await axios.post(`${AI_SERVICE_URL}/api/process`, {
        text: rawText
      }, {
        timeout: 120000 // 30 second timeout
      });
      return response.data;
    } catch (error) {
      console.error('AI Service Error:', error.message);
      throw new Error('Failed to process text with AI');
    }
  }

  async categorizeNote(text) {
    try {
      const response = await axios.post(`${AI_SERVICE_URL}/api/categorize`, {
        text: text
      });
      return response.data;
    } catch (error) {
      console.error('AI Categorization Error:', error.message);
      throw new Error('Failed to categorize note');
    }
  }

  async generateVisual(text, keywords) {
    try {
      const response = await axios.post(`${AI_SERVICE_URL}/api/visualize`, {
        text: text,
        keywords: keywords
      });
      return response.data;
    } catch (error) {
      console.error('AI Visualization Error:', error.message);
      return null; // Non-critical, can fail gracefully
    }
  }
}

module.exports = new AIService();