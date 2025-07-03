import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [quizzes, setQuizzes] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  useEffect(() => {
    fetch('http://localhost:5000/api/quizzes')
      .then(res => res.json())
      .then(data => setQuizzes(data))
      .catch(err => console.error('Fetch error:', err));
  }, []);

  if (quizzes.length === 0) return <div className="App">Loading quizzes...</div>;

  const currentQuiz = quizzes[currentIndex];

  const handleAnswerClick = (index) => {
    if (index === currentQuiz.answer) {
      setScore(score + 1);
    }
    const nextIndex = currentIndex + 1;
    if (nextIndex < quizzes.length) {
      setCurrentIndex(nextIndex);
    } else {
      setShowScore(true);
    }
  };

  return (
    <div className="App">
      <div className="quiz-container">
        <h1>Quiz App</h1>
        {showScore ? (
          <div className="score">
            Your score: {score} / {quizzes.length}
          </div>
        ) : (
          <div>
            <h3>{currentQuiz.question}</h3>
            <ul>
              {currentQuiz.options.map((option, index) => (
                <li key={index}>
                  <button onClick={() => handleAnswerClick(index)}>{option}</button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
