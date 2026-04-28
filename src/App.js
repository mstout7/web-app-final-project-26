import './App.css';
import React, { useState, useEffect } from 'react'; // Added useEffect to import
import { fetchMedia, fetchCocktail, GENRE_MAP, COCKTAIL_MAPPING } from './services/api'; // Import mappings
import Quiz from './components/Quiz';
import ResultCard from './components/ResultCard';

const App = () => {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  // Move the test inside the component
  useEffect(() => {
    const test = async () => {
      try {
        const data = await fetchMedia('movie', 'romance', false);
        console.log("Test API Result:", data);
      } catch (e) {
        console.log("Test failed - check API keys or Network tab");
      }
    };
    test();
  }, []);

  const handleFinishQuiz = async (finalAnswers) => {
    setLoading(true);
    setResult(null);

    // 1. Determine Type (Move this logic here)
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

      // 3. API Calls (Use the local variables we just defined)
      const [mediaRec, cocktailRec] = await Promise.all([
        fetchMedia(type, genreKey, finalAnswers.isMature),
        fetchCocktail(flavor, finalAnswers.isAlcoholic)
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