// constants can stay at the top
const GENRE_MAP = {
  murder_mystery: { movie: 80, book: "mystery+thriller" },
  action_adventure: { movie: 28, book: "action+adventure" },
  romance: { movie: 10749, book: "romance" },
  non_fiction: { movie: 99, book: "nonfiction" },
  fantasy_sci_fi: { movie: 878, book: "science+fiction" }
};

const COCKTAIL_MAPPING = {
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

// Export the actual workers
export const fetchMedia = async (type, genreKey, isMature) => {
  const genreData = GENRE_MAP[genreKey];
  const url = type === 'movie' 
    ? `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_TMDB_KEY}&with_genres=${genreData.movie}&include_adult=${selections.isMature}`
    : `https://www.googleapis.com/books/v1/volumes?q=subject:${genreData.book}`;

  const res = await fetch(url);
  const data = await res.json();
  const items = type === 'movie' ? data.results : data.items;
  return items[Math.floor(Math.random() * items.length)];
};

export const fetchCocktail = async (flavorProfile, isAlcoholicPreference) => {
  const ingredients = COCKTAIL_MAPPING[flavorProfile];
  const ingredient = ingredients[Math.floor(Math.random() * ingredients.length)];
  
  // 1. Get list of drinks by ingredient
  const listRes = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`);
  const listData = await listRes.json();
  
  if (!listData.drinks) return null;

  // 2. We need to check the "Alcoholic" status, which isn't in the filter list.
  // We'll grab a few candidates and check their details.
  const candidates = listData.drinks.sort(() => 0.5 - Math.random()).slice(0, 5);

  for (let candidate of candidates) {
    const detailRes = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${candidate.idDrink}`);
    const detailData = await detailRes.json();
    const drink = detailData.drinks[0];

    // 3. Match against preference
    // API values are usually "Alcoholic", "Non alcoholic", or "Optional alcohol"
    const isDrinkAlcoholic = drink.strAlcoholic === "Alcoholic";

    if (isAlcoholicPreference === isDrinkAlcoholic) {
      return drink; // Found a match!
    }
  }

  // Fallback: If no match found in candidates, just return the first one found 
  // or a default "Virgin" version of a drink.
  return listData.drinks[0];
};