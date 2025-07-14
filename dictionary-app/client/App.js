import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dictionary from './src/DictionaryApp';
import AddWord from './src/components/AddWord';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dictionary />} />
        <Route path="/add" element={<AddWord />} />
      </Routes>
    </Router>
  );
}

export default App;
