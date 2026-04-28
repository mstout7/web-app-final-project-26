export const GENRE_MAP = {
  murder_mystery: { movie: 80, book: "mystery+thriller" },
  action_adventure: { movie: 28, book: "action+adventure" },
  romance: { movie: 10749, book: "romance" },
  non_fiction: { movie: 99, book: "nonfiction" },
  fantasy_sci_fi: { movie: 878, book: "science+fiction" }
};

export const COCKTAIL_MAPPING = {
  sweet_fruity: [
    'Strawberry', 
    'Pineapple juice', 
    'Grenadine', 
    'Apple juice', 
    'Mango'
  ],
  chocolatey: [
    'Chocolate liqueur', 
    'Kahlua', 
    'Baileys irish cream', 
    'Cocoa powder'
  ],
  savory_smoky: [
    'Tomato juice', 
    'Tabasco sauce', 
    'Worcestershire sauce', 
    'Salt'
  ],
  sour_bitter: [
    'Lemon juice', 
    'Lime juice', 
    'Campari', 
    'Grapefruit juice'
  ],
  earthy_herby: [
    'Gin', 
    'Mint', 
    'Rosemary', 
    'Basil'
  ]
};

// 2. The Media Fetcher
export const fetchMedia = async (type, genreKey, isMature) => {
  const genreData = GENRE_MAP[genreKey];
  
  if (type === 'movie') {
    const res = await fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_TMDB_KEY}&with_genres=${genreData.movie}&include_adult=${isMature}`
    );
    const data = await res.json();
    // Return a random movie object (includes poster_path, title, overview)
    return data.results[Math.floor(Math.random() * data.results.length)];
  } else {
    const res = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=subject:${genreData.book}&maxResults=20`
    );
    const data = await res.json();
    // Return a random book object (includes volumeInfo with title, description, imageLinks)
    return data.items[Math.floor(Math.random() * data.items.length)];
  }
};

// 3. The Cocktail Fetcher
export const fetchCocktail = async (flavorProfile, isAlcoholic) => {
  const ingredients = COCKTAIL_MAPPING[flavorProfile];
  const ingredient = ingredients[Math.floor(Math.random() * ingredients.length)];
  
  const res = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`);
  const data = await res.json();
  const list = data.drinks;
  
  // Pick a random drink from the filtered list
  const randomDrinkSummary = list[Math.floor(Math.random() * list.length)];

  // IMPORTANT: The filter API only gives ID and Image. 
  // We must fetch the FULL details to get the instructions (description).
  const detailRes = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${randomDrinkSummary.idDrink}`);
  const detailData = await detailRes.json();
  
  return detailData.drinks[0]; 
};