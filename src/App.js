import './App.css';
import React, { useState, useEffect } from 'react'; // Added useEffect to import
import { fetchMedia, fetchCocktail, GENRE_MAP, COCKTAIL_MAPPING } from './services/api'; // Import mappings
import Quiz from './components/Quiz';
import ResultCard from './components/ResultCard';

const App = () => {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFinishQuiz = async (finalAnswers) => {
  setLoading(true);

  // 1. Determine Type (The Coin Flip)
  const type = finalAnswers.mediaType === 'either' 
    ? (Math.random() > 0.5 ? 'book' : 'movie') 
    : finalAnswers.mediaType;

  let genreKey = finalAnswers.genreKey;
  let flavor = finalAnswers.flavor;

  try {
    // 2. Handle Surprise Logic
    if (genreKey === 'surprise') {
      const genres = Object.keys(GENRE_MAP);
      genreKey = genres[Math.floor(Math.random() * genres.length)];
    }

    if (flavor === 'surprise') {
      const flavors = Object.keys(COCKTAIL_MAPPING);
      flavor = flavors[Math.floor(Math.random() * flavors.length)];
    }

    // 3. API Calls
    const [mediaRec, cocktailRec] = await Promise.all([
      fetchMedia(type, genreKey, finalAnswers.isMature),
      fetchCocktail(flavor, finalAnswers.isAlcoholic)
    ]);

    // 4. Update the screen
    setResult({
      media: mediaRec,
      drink: cocktailRec,
      type: type // Very important so ResultCard knows if it's a book or movie!
    });

  } catch (error) {
    console.error("Failed to fetch vibes:", error);
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="container">
      {loading ? (
        <div className="loader-container">
          <div className="shaking-cocktail">🍸</div> 
          <h2>Mixing your vibe...</h2>
        </div>
      ) : result ? (
        <ResultCard data={result} onReset={() => setResult(null)} />
      ) : (
        <Quiz onComplete={handleFinishQuiz} />
      )}
    </div>
  );
};

export default App;