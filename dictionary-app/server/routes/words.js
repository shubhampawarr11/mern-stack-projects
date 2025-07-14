const express = require('express');
const router = express.Router();
const Word = require('../models/Word');

// Get all words
router.get('/', async (req, res) => {
  const words = await Word.find();
  res.json(words);
});

// Add a new word
router.post('/', async (req, res) => {
  const { word, definition } = req.body;
  const newWord = new Word({ word, definition });
  await newWord.save();
  res.json(newWord);
});

// Get word by query
router.get('/:word', async (req, res) => {
  const word = await Word.findOne({ word: req.params.word });
  if (word) res.json(word);
  else res.status(404).json({ message: 'Word not found' });
});

module.exports = router;
