const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();


const app = express();
app.use(cors());
app.use(express.json()); // parse JSON bodies

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));


// Quiz Schema & Model
const quizSchema = new mongoose.Schema({
  question: String,
  options: [String],
  answer: Number, // index of correct option
});

const Quiz = mongoose.model('Quiz', quizSchema);

// Routes
app.get('/api/quizzes', async (req, res) => {
  const quizzes = await Quiz.find();
  res.json(quizzes);
});

app.post('/api/quizzes', async (req, res) => {
  const newQuiz = new Quiz(req.body);
  await newQuiz.save();
  res.json(newQuiz);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

app.get('/', (req, res) => {
  res.send('Backend server is running');
});
