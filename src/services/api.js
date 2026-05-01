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

    // SAFETY CHECK: Make sure 'items' actually exists before checking length
    if (!data.items || data.items.length === 0) {
      console.error("No books found or API error:", data);
      throw new Error("No books found");
    } // Return a random book object (includes volumeInfo with title, description, imageLinks)
    return data.items[Math.floor(Math.random() * data.items.length)];
  }
};

// 3. The Cocktail Fetcher
export const fetchCocktail = async (flavor, isAlcoholic) => {
  const ingredientsArray = COCKTAIL_MAPPING[flavor];
  const ingredient = ingredientsArray[Math.floor(Math.random() * ingredientsArray.length)];
  
  try {
    const res = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`);
    
    // Safety check: Did we get a 200 OK response?
    if (!res.ok) throw new Error('Network response was not ok');

    const text = await res.text(); // Read as text first to see if it's empty
    if (!text) throw new Error('Empty response from Cocktail API');

    const data = JSON.parse(text); // Manually turn it into JSON
    
    const drinks = data.drinks;
    const randomDrink = drinks[Math.floor(Math.random() * drinks.length)];

    // We need the FULL details (ingredients/instructions), so we fetch by ID
    const detailRes = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${randomDrink.idDrink}`);
    const detailData = await detailRes.json();
    
    return detailData.drinks[0];
  } catch (error) {
    console.error("Cocktail fetch failed:", error);
    // Return a fallback drink so the app doesn't crash
    return { 
      strDrink: "Water", 
      strInstructions: "Stay hydrated! The cocktail bar is temporarily closed.", 
      strDrinkThumb: "https://www.thecocktaildb.com/images/media/drink/73u11c1665057064.jpg" 
    };
  }
};