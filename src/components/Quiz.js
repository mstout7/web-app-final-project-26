const Quiz = ({ onComplete }) => {
  const handleSubmit = () => {
    // Collect form data
    const results = { media: 'movie', genre: 'horror' }; 
    onComplete(results); // Sends data back up to App.js
  };

  return (
    <div>
       {/* Your quiz questions here */}
       <button onClick={handleSubmit}>Find my Match!</button>
    </div>
  );
};