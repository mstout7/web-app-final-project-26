import React, { useState } from 'react';
// import { BiDrink } from 'react-icons/bi'; // A cocktail icon


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

  // Question to question transition
  const q1Ref = useState(null);
  const q2Ref = useState(null);
  const q3Ref = useState(null);
  const q4Ref = useState(null);
  const q5Ref = useState(null);

  const scrollToQ1 = () => {
    q1Ref.current.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  };
  const handleAnswerQ1 = (answer) => {

    q2Ref.current.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }
  const handleAnswerQ2 = (answer) => {

    q3Ref.current.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });

  };
  const handleAnswerQ3 = (answer) => {

    q4Ref.current.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });

    const { name, value } = answer.target;
    const finalValue = value === 'true' ? true : value === 'false' ? false : value;

    setAnswers(prev => ({
      ...prev,
      [name]: finalValue
    }));
  };
  const handleAnswerQ4 = (answer) => {
    q5Ref.current.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });

  };

  // Athena's HTML
  return (
    <div className="container">
      <div className='mainpage'>
        <h1 className="main-header">Welcome to Midnight Menu!</h1>
        <h4 className="main-subhead">Find your perfect weekend activity with our easy to take quiz!<br></br>We will suggest a cocktail, movie, and book for
          your perfect night.</h4>
        {/* <p className="intro">	&or;</p> */}
        <button onClick={scrollToQ1} className="down-arrow">
          ↓
        </button>
      </div>

      <form className="quiz-container" onSubmit={handleSubmit}>
        <h2 ref={q1Ref} className="quiz-header">Customize Your Vibe</h2>

        {/* Question 1: Media Type */}
        <div className="question-block, card1">
          <p>1. Are you more of a:</p>
          <label>
            <input type="radio" name="mediaType" value="book" onChange={handleAnswerQ1} /> Bookworm
          </label>
          <label>
            <input type="radio" name="mediaType" value="movie" onChange={handleAnswerQ1} /> Movie buff
          </label>
          <label>
            <input type="radio" name="mediaType" value="either" onChange={handleAnswerQ1} /> Either or!
          </label>
        </div>

        {/* Question 2: Mature Content */}
        <div ref={q2Ref} className="question-block, card2">
          <p>2. Mature Stuff ok?</p>
          <label>
            <input type="radio" name="isMature" value="true" onChange={handleAnswerQ2} /> Yes
          </label>
          <label>
            <input type="radio" name="isMature" value="false" onChange={handleAnswerQ2} /> No
          </label>
        </div>

        {/* Question 3: Genre */}
        <div ref={q3Ref} className="question-block, card3">
          <p>3. What kind of genre?</p>
          <select name="genreKey" onChange={handleAnswerQ3} value={answers.genreKey}>
            <option value="murder_mystery">Murder mystery</option>
            <option value="action_adventure">Action/Adventure</option>
            <option value="romance">Romance</option>
            <option value="non_fiction">Non-fiction/documentary</option>
            <option value="fantasy_sci_fi">Fantasy/Sci-fi</option>
            <option value="surprise">Surprise Me!</option>
          </select>
        </div>

        {/* Question 4: Alcohol */}
        <div ref={q4Ref} className="question-bloc, card4">
          <p>4. Are we feeling like a:</p>
          <label>
            <input type="radio" name="isAlcoholic" value="true" onChange={handleAnswerQ4} /> Alcoholic drink
          </label>
          <label>
            <input type="radio" name="isAlcoholic" value="false" onChange={handleAnswerQ4} /> Non-alcoholic drink
          </label>
        </div>

        {/* Question 5: Flavor */}
        <div ref={q5Ref} className="question-block, card5">
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
    </div>
  );
};
export default Quiz;
