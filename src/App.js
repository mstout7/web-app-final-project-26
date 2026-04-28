import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import { fetchMedia, fetchCocktail } from './services/api';
import Quiz from './components/Quiz';
import ResultCard from './components/ResultCard';

const App = () => {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFinishQuiz = async (finalAnswers) => {
    setLoading(true);
    
    // Logic for "Either or!"
    const type = finalAnswers.mediaType === 'either' 
      ? (Math.random() > 0.5 ? 'book' : 'movie') 
      : finalAnswers.mediaType;

    try {
      const [mediaRec, cocktailRec] = await Promise.all([
        fetchMedia(type, finalAnswers.genreKey, finalAnswers.isMature),
        fetchCocktail(finalAnswers.flavor)
      ]);

      setResult({ media: mediaRec, drink: cocktailRec, type });
    } catch (error) {
      console.error("Failed to fetch vibes:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      {!result ? (
        <Quiz onComplete={handleFinishQuiz} loading={loading} />
      ) : (
        <ResultCard data={result} onReset={() => setResult(null)} />
      )}
    </div>
  );
};

export default App;
