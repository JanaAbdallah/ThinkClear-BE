// const Note = require('../models/Note');
// const aiService = require('../utils/aiService');

// // Create Note with AI Processing
// exports.createNote = async (req, res) => {
//   try {
//     const { rawText } = req.body;

//     if (!rawText || rawText.trim().length === 0) {
//       return res.status(400).json({ error: 'Note text is required' });
//     }

//     // Process text with AI
//     const aiResult = await aiService.processText(rawText);

//     // Create note with AI-processed data
//     const note = new Note({
//       user: req.userId,
//       rawText: rawText,
//       cleanText: aiResult.cleanText,
//       keywords: aiResult.keywords,
//       category: aiResult.category,
//       subcategory: aiResult.subcategory || '',
//       theme: aiResult.theme,
//       icon: aiResult.icon,
//       aiInsight: aiResult.insight
//     });

//     // Generate visual data (async, non-blocking)
//     if (aiResult.keywords && aiResult.keywords.length > 0) {
//       try {
//         const visualData = await aiService.generateVisual(aiResult.cleanText, aiResult.keywords);
//         note.visualData = visualData;
//       } catch (err) {
//         console.log('Visual generation failed, continuing without it');
//       }
//     }

//     await note.save();

//     res.status(201).json({
//       message: 'Note created successfully',
//       note: note
//     });
//   } catch (error) {
//     console.error('Create Note Error:', error);
//     res.status(500).json({ error: error.message });
//   }
// };

// // Get All Notes
// exports.getAllNotes = async (req, res) => {
//   try {
//     const { category, search } = req.query;
    
//     let query = { user: req.userId };

//     if (category) {
//       query.category = category;
//     }

//     if (search) {
//       query.$text = { $search: search };
//     }

//     const notes = await Note.find(query)
//       .sort({ createdAt: -1 })
//       .select('-rawText'); // Don't send raw text by default

//     res.json({ notes, count: notes.length });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // Get Single Note
// exports.getNote = async (req, res) => {
//   try {
//     const note = await Note.findOne({
//       _id: req.params.id,
//       user: req.userId
//     });

//     if (!note) {
//       return res.status(404).json({ error: 'Note not found' });
//     }

//     res.json({ note });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // Update Note
// exports.updateNote = async (req, res) => {
//   try {
//     const { rawText } = req.body;

//     const note = await Note.findOne({
//       _id: req.params.id,
//       user: req.userId
//     });

//     if (!note) {
//       return res.status(404).json({ error: 'Note not found' });
//     }

//     // If text changed, reprocess with AI
//     if (rawText && rawText !== note.rawText) {
//       const aiResult = await aiService.processText(rawText);
      
//       note.rawText = rawText;
//       note.cleanText = aiResult.cleanText;
//       note.keywords = aiResult.keywords;
//       note.category = aiResult.category;
//       note.subcategory = aiResult.subcategory || '';
//       note.theme = aiResult.theme;
//       note.icon = aiResult.icon;
//       note.aiInsight = aiResult.insight;
//     }

//     await note.save();

//     res.json({ message: 'Note updated successfully', note });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // Delete Note
// exports.deleteNote = async (req, res) => {
//   try {
//     const note = await Note.findOneAndDelete({
//       _id: req.params.id,
//       user: req.userId
//     });

//     if (!note) {
//       return res.status(404).json({ error: 'Note not found' });
//     }

//     res.json({ message: 'Note deleted successfully' });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // Search Notes
// exports.searchNotes = async (req, res) => {
//   try {
//     const { q } = req.query;

//     const notes = await Note.find({
//       user: req.userId,
//       $or: [
//         { cleanText: { $regex: q, $options: 'i' } },
//         { keywords: { $regex: q, $options: 'i' } },
//         { category: { $regex: q, $options: 'i' } }
//       ]
//     }).sort({ createdAt: -1 });

//     res.json({ notes, count: notes.length });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };


const Note = require('../models/Note');
const aiService = require('../utils/aiService');

// Create Note with AI Processing
exports.createNote = async (req, res) => {
  try {
    const { rawText } = req.body;

    if (!rawText || rawText.trim().length === 0) {
      return res.status(400).json({ error: 'Note text is required' });
    }

    // Process text with AI
    const aiResult = await aiService.processText(rawText);

    // Create note with AI-processed data
    const note = new Note({
      user: req.userId,
      rawText: rawText,
      cleanText: aiResult.cleanText,
      keywords: aiResult.keywords,
      category: aiResult.category,
      subcategory: aiResult.subcategory || '',
      theme: aiResult.theme,
      icon: aiResult.icon,
      aiInsight: aiResult.insight,
      updatedAt: Date.now()  // Add this
    });

    // Generate visual data (async, non-blocking)
    if (aiResult.keywords && aiResult.keywords.length > 0) {
      try {
        const visualData = await aiService.generateVisual(aiResult.cleanText, aiResult.keywords);
        note.visualData = visualData;
      } catch (err) {
        console.log('Visual generation failed, continuing without it');
      }
    }

    await note.save();

    res.status(201).json({
      message: 'Note created successfully',
      note: note
    });
  } catch (error) {
    console.error('Create Note Error:', error);
    res.status(500).json({ error: error.message });
  }
};

// Get All Notes
exports.getAllNotes = async (req, res) => {
  try {
    const { category, search } = req.query;
    
    let query = { user: req.userId };

    if (category) {
      query.category = category;
    }

    if (search) {
      query.$text = { $search: search };
    }

    const notes = await Note.find(query)
      .sort({ createdAt: -1 })
      .select('-rawText'); // Don't send raw text by default

    res.json({ notes, count: notes.length });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Single Note
exports.getNote = async (req, res) => {
  try {
    const note = await Note.findOne({
      _id: req.params.id,
      user: req.userId
    });

    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }

    res.json({ note });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update Note
exports.updateNote = async (req, res) => {
  try {
    const { rawText } = req.body;

    const note = await Note.findOne({
      _id: req.params.id,
      user: req.userId
    });

    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }

    // If text changed, reprocess with AI
    if (rawText && rawText !== note.rawText) {
      const aiResult = await aiService.processText(rawText);
      
      note.rawText = rawText;
      note.cleanText = aiResult.cleanText;
      note.keywords = aiResult.keywords;
      note.category = aiResult.category;
      note.subcategory = aiResult.subcategory || '';
      note.theme = aiResult.theme;
      note.icon = aiResult.icon;
      note.aiInsight = aiResult.insight;
    }

    note.updatedAt = Date.now();  // Add this
    await note.save();

    res.json({ message: 'Note updated successfully', note });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete Note
exports.deleteNote = async (req, res) => {
  try {
    const note = await Note.findOneAndDelete({
      _id: req.params.id,
      user: req.userId
    });

    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }

    res.json({ message: 'Note deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Search Notes
exports.searchNotes = async (req, res) => {
  try {
    const { q } = req.query;

    const notes = await Note.find({
      user: req.userId,
      $or: [
        { cleanText: { $regex: q, $options: 'i' } },
        { keywords: { $regex: q, $options: 'i' } },
        { category: { $regex: q, $options: 'i' } }
      ]
    }).sort({ createdAt: -1 });

    res.json({ notes, count: notes.length });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};