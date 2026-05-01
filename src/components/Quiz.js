import React, { useState } from 'react';
import { BiDrink } from 'react-icons/bi'; // A cocktail icon


const Quiz = ({ onComplete, loading }) => {
  // Store all answers in one state object
  const [answers, setAnswers] = useState({
    mediaType: 'book',
    isMature: false,
    genreKey: 'romance',
    isAlcoholic: true,
    flavor: 'sweet_fruity'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Convert string 'true'/'false' back to actual booleans for the API
    const finalValue = value === 'true' ? true : value === 'false' ? false : value;
    
    setAnswers(prev => ({
      ...prev,
      [name]: finalValue
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onComplete(answers);
  };

  return (
    <div className="container">
      <form className="quiz-container" onSubmit={handleSubmit}>
      <h2>Customize Your Vibe</h2>

      {/* Question 1: Media Type */}
      <div className="question-block">
        <p>1. Are you more of a:</p>
        <label>
          <input type="radio" name="mediaType" value="book" onChange={handleChange} /> Bookworm
        </label>
        <label>
          <input type="radio" name="mediaType" value="movie" onChange={handleChange} /> Movie buff
        </label>
        <label>
          <input type="radio" name="mediaType" value="either" onChange={handleChange} /> Either or!
        </label>
      </div>

      {/* Question 2: Mature Content */}
      <div className="question-block">
        <p>2. Mature Stuff ok?</p>
        <label>
          <input type="radio" name="isMature" value="true" onChange={handleChange} /> Yes
        </label>
        <label>
          <input type="radio" name="isMature" value="false" onChange={handleChange} /> No
        </label>
      </div>

      {/* Question 3: Genre */}
      <div className="question-block">
        <p>3. What kind of genre?</p>
        <select name="genreKey" onChange={handleChange} value={answers.genreKey}>
          <option value="murder_mystery">Murder mystery</option>
          <option value="action_adventure">Action/Adventure</option>
          <option value="romance">Romance</option>
          <option value="non_fiction">Non-fiction/documentary</option>
          <option value="fantasy_sci_fi">Fantasy/Sci-fi</option>
          <option value="surprise">Surprise Me!</option>
        </select>
      </div>

      {/* Question 4: Alcohol */}
      <div className="question-block">
        <p>4. Are we feeling like a:</p>
        <label>
          <input type="radio" name="isAlcoholic" value="true" onChange={handleChange} /> Alcoholic drink
        </label>
        <label>
          <input type="radio" name="isAlcoholic" value="false" onChange={handleChange} /> Non-alcoholic drink
        </label>
      </div>

      {/* Question 5: Flavor */}
      <div className="question-block">
        <p>5. What sort of flavor profile?</p>
        <label>
          <input type="radio" name="flavor" value="sweet_fruity" onChange={handleChange} /> Fruity
        </label>
        <label>
          <input type="radio" name="flavor" value="chocolatey" onChange={handleChange} /> Chocolatey
        </label>
        <label>
          <input type="radio" name="flavor" value="savory_smoky" onChange={handleChange} /> Savory/Smoky
        </label>
        <label>
          <input type="radio" name="flavor" value="sour_bitter" onChange={handleChange} /> Sour/Bitter
        </label>
        <label>
          <input type="radio" name="flavor" value="earthy_herby" onChange={handleChange} /> Earthy/Herby
        </label>
        <label>
          <input type="radio" name="flavor" value="surprise" onChange={handleChange} /> Surprise Me!
        </label>
      </div>

      <button type="submit" disabled={loading} className="submit-btn">
        {loading ? "Mixing..." : "Get My Recommendation"}
      </button>
    </form>

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