const ResultCard = ({ data, onReset }) => {
  // If data hasn't loaded yet, show a tiny message instead of crashing
  if (!data || !data.media || !data.drink) {
    return <div>Loading your vibe...</div>;
  }

  const { media, drink, type } = data;

  // 1. Determine if we are looking at a Book or Movie
  const isMovie = type === 'movie';

  // 2. Safely grab the info based on the type
  const title = isMovie 
    ? media.title 
    : media.volumeInfo?.title;

  const description = isMovie 
    ? media.overview 
    : media.volumeInfo?.description;

  const image = isMovie 
    ? `https://image.tmdb.org/t/p/w500${media.poster_path}` 
    : media.volumeInfo?.imageLinks?.thumbnail;

  //Drink logic
  // This logic pulls out all ingredients that aren't null
  const getIngredients = () => {
    const ingredients = [];
    for (let i = 1; i <= 15; i++) {
      const ingredient = drink[`strIngredient${i}`];
      const measure = drink[`strMeasure${i}`];

      if (ingredient) {
        ingredients.push(`${measure ? measure : ''} ${ingredient}`.trim());
      }
    }
    return ingredients;
  };

  const ingredientList = getIngredients();
  return (
    <div className="results-page">
      <div className="flex-container">
        
        {/* LEFT SIDE: THE MEDIA */}
        <div className="card">
          {image ? <img src={image} alt={title} className="poster" /> : <div className="no-image">No Cover Available</div>}
          <h2>{title}</h2>
          <p className="description">
            {description ? description.substring(0, 300) + "..." : "No description available."}
          </p>
        </div>

        {/* RIGHT SIDE: THE DRINK */}
        <div className="card">
          <img src={drink.strDrinkThumb} alt={drink.strDrink} className="drink-img" />
          <h2>{drink.strDrink}</h2>
          
          <ul className="ingredient-list">
            {ingredientList.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>

          <h3>Instructions:</h3>
          <p className="description">{drink.strInstructions}</p>
        </div>

      </div>
      <button onClick={onReset} className="reset-btn">Start Over</button>
    </div>
  );
};

export default ResultCard;