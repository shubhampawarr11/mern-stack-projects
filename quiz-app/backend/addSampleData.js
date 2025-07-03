const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI);

const quizSchema = new mongoose.Schema({
  question: String,
  options: [String],
  answer: Number,
});

const Quiz = mongoose.model('Quiz', quizSchema);

const quizzes = [
  {
    question: "What is the capital of France?",
    options: ["Berlin", "London", "Paris", "Madrid"],
    answer: 2,
  },
  {
    question: "Who wrote 'Hamlet'?",
    options: ["Charles Dickens", "William Shakespeare", "Leo Tolstoy", "Mark Twain"],
    answer: 1,
  },
  {
    question: "What is 2 + 2?",
    options: ["3", "4", "5", "6"],
    answer: 1,
  },
    {
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Jupiter", "Saturn"],
    answer: 1,
  },
];

async function addData() {
  await Quiz.deleteMany();
  await Quiz.insertMany(quizzes);
  console.log('Sample data added');
  mongoose.disconnect();
}

addData();
