const ResultCard = ({ data, onReset }) => {
  const isMovie = data.type === 'movie';
  
  // Extracting Media Info
  const title = isMovie ? data.media.title : data.media.volumeInfo.title;
  const description = isMovie ? data.media.overview : data.media.volumeInfo.description;
  const image = isMovie 
    ? `https://image.tmdb.org/t/p/w500${data.media.poster_path}`
    : data.media.volumeInfo.imageLinks?.thumbnail;

  return (
    <div className="results-page">
      <div className="flex-container">
        
        {/* LEFT SIDE: THE MEDIA */}
        <div className="card">
          <img src={image} alt={title} className="poster" />
          <h2>{title}</h2>
          <p className="description">{description?.substring(0, 200)}...</p>
        </div>

        {/* RIGHT SIDE: THE DRINK */}
        <div className="card">
          <img src={data.drink.strDrinkThumb} alt={data.drink.strDrink} className="drink-img" />
          <h2>{data.drink.strDrink}</h2>
          {/* CocktailDB provides instructions in 'strInstructions' */}
          <p className="description">{data.drink.strInstructions}</p>
        </div>

      </div>
      <button onClick={onReset} className="reset-btn">Start Over</button>
    </div>
  );
};

export default ResultCard;