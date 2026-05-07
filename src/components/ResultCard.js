import React from 'react';

const ResultCard = ({ data, onReset }) => {
  // If data is a movie, it uses 'title' and 'overview'
  // If data is a book, it uses 'title' and 'description'
  const { media, drink, type } = data;

  // Determine which image and text to show based on the media type
  const title = media.title || media.name;
  const description = media.description || media.overview || "No description available.";
  
  
  const imageSrc = type === 'movie' 
  ? `https://image.tmdb.org/t/p/w500${media.poster_path}` 
  : media.image;

  return (
    <div className="results-wrapper">
      <div className="results-container">
        
        {/* LEFT SIDE: THE MEDIA (Book or Movie) */}
        <div className="card media-card">
          <div className="card-header">
            <span className="badge">{type.toUpperCase()}</span>
          </div>

          {imageSrc ? (
            <img src={imageSrc} alt={title} className="poster" />
          ) : (
            <div className="no-image">No Image Available</div>
          )}

          <h2>{title}</h2>

          {/* NEW: Book-specific info (only shows if it's a book) */}
          {type === 'book' && (
            <div className="book-meta">
              <p className="author">By {media.author}</p>
              {media.rank && <span className="rank-badge">NYT Rank: #{media.rank}</span>}
            </div>
          )}

          <p className="description">
            {description.length > 400 
              ? description.substring(0, 400) + "..." 
              : description}
          </p>

          {media.link && (
            <a href={media.link} target="_blank" rel="noreferrer" className="info-link">
              {type === 'book' ? 'View on Amazon' : 'More Info'}
            </a>
          )}
        </div>

        {/* RIGHT SIDE: THE DRINK */}
        <div className="card drink-card">
          <div className="card-header">
            <span className="badge">DRINK PAIRING</span>
          </div>
          <img src={drink.strDrinkThumb} alt={drink.strDrink} className="poster" />
          <h2>{drink.strDrink}</h2>
          <div className="ingredients">
            <h4>Ingredients:</h4>
            <ul>
              {/* This helper lists all ingredients from the API */}
              {[...Array(15)].map((_, i) => {
                const ing = drink[`strIngredient${i + 1}`];
                const measure = drink[`strMeasure${i + 1}`];
                return ing ? <li key={i}>{measure} {ing}</li> : null;
              })}
            </ul>
          </div>
          <p className="instructions">{drink.strInstructions}</p>
        </div>
      </div>

      <button onClick={onReset} className="reset-btn">
        Try Another Vibe
      </button>

       {/* BOTTOM ATTRIBUTION SECTION */}
      <footer className="attribution-footer">
        <div className="attribution-item">
          <img 
            src="https://developer.nytimes.com/files/poweredby_nytimes_65a.png?v=1763725717000" 
            alt="Data provided by The New York Times" 
            className="nyt-logo"
          />
          <img 
            src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg" 
            alt="Powered by TMDB" 
            className="tmdb-logo"
          />
        </div>
        <p>This product uses the TMDB and NYT APIs but is not endorsed or certified by either.</p>

      </footer>
    </div>

  );
};

export default ResultCard;