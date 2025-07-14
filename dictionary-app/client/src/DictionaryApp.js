import React, { useState } from "react";
import axios from "axios";

const DictionaryApp = () => {
  const [word, setWord] = useState("");
  const [meanings, setMeanings] = useState([]);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (!word) return;
    try {
      const res = await axios.get(`http://localhost:5000/api/define/${word}`);
      setMeanings(res.data[0].meanings);
      setError("");
    } catch (err) {
      setMeanings([]);
      setError("Word not found");
    }
  };

  return (
    <div className="min-h-screen bg-gray-300 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-purple-200 max-w-3xl w-full rounded-2xl shadow-2xl p-10 sm:p-12 border border-indigo-200">
        <h2 className="text-4xl font-extrabold text-black-700 mb-8 flex items-center gap-3 select-none">
          📘 Dictionary App
        </h2>

        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <input
            type="text"
            value={word}
            placeholder="Enter a word"
            onChange={(e) => setWord(e.target.value)}
            className="flex-grow px-5 py-3 border border-black-300 rounded-xl shadow-md placeholder-indigo-400 focus:outline-none focus:ring-4 focus:ring-indigo-400 focus:border-indigo-500 transition"
          />
          <button
            onClick={handleSearch}
            className="px-7 py-3 bg-indigo-600 text-white font-semibold rounded-xl shadow-lg hover:bg-indigo-700 active:scale-95 transition-transform duration-150"
            aria-label="Search"
          >
            Search
          </button>
        </div>

        {error && (
          <p className="text-red-600 font-semibold mb-8 bg-red-50 border border-red-200 rounded-lg px-5 py-3 shadow-inner select-text">
            {error}
          </p>
        )}

        {meanings.length > 0 && (
          <div className="space-y-8">
            {meanings.map((meaning, idx) => (
              <div
                key={idx}
                className="bg-gray-200 border border-indigo-200 rounded-2xl p-6 shadow-md hover:shadow-xl transition-shadow"
              >
                <h4 className="text-2xl font-semibold text-indigo-800 mb-4">
                  Part of Speech:{" "}
                  <span className="italic lowercase">
                    {meaning.partOfSpeech}
                  </span>
                </h4>
                <ul className="list-disc list-inside space-y-2 text-indigo-900 text-lg">
                  {meaning.definitions.map((def, i) => (
                    <li key={i}>{def.definition}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DictionaryApp;
