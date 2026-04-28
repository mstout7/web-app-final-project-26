import React from 'react';
import { BiDrink } from 'react-icons/bi'; // A cocktail icon


const Quiz = ({ onComplete, loading }) => {
  const handleSubmit = () => {
    // Collect your quiz data here
    const answers = {
      genreKey: 'romance', // Replace with your actual state variables
      flavor: 'sweet_fruity',
      mediaType: 'movie',
      isMature: false
    };
    onComplete(answers);
  };

  return (
    <div className="quiz-container">
      {/* ... your questions ... */}

      <button 
        onClick={handleSubmit} 
        disabled={loading} // Prevent double clicks
        className="submit-btn"
      >
        {loading ? <BiDrink className="spinning-icon" /> : "Generate"}
      </button>
    </div>
  );
};

export default Quiz;