const express = require('express');
const router = express.Router();
const noteController = require('../controllers/noteController');
const auth = require('../middleware/auth');

// All routes require authentication
router.use(auth);

router.post('/', noteController.createNote);
router.get('/', noteController.getAllNotes);
router.get('/search', noteController.searchNotes);
router.get('/:id', noteController.getNote);
router.put('/:id', noteController.updateNote);
router.delete('/:id', noteController.deleteNote);

module.exports = router;