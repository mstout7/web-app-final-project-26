export const GENRE_MAP = {
  murder_mystery: { movie: 80, book: "crime-and-punishment" },
  action_adventure: { movie: 28, book: "fiction" },
  romance: { movie: 10749, book: "romance" },
  non_fiction: { movie: 99, book: "non-fiction" },
  fantasy_sci_fi: { movie: 878, book: "fantasy" } 
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
  const genreEntry = GENRE_MAP[genreKey];
  const NYT_KEY = process.env.REACT_APP_NYT_KEY;
  const TMDB_KEY = process.env.REACT_APP_TMDB_KEY;

  if (type === 'movie') {
    // ... (Movie fetch remains the same)
    const res = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${TMDB_KEY}&with_genres=${genreEntry.movie}&include_adult=${isMature}`);
    const data = await res.json();
    return { type: 'movie', ...data.results[Math.floor(Math.random() * data.results.length)] };
  } else {
    
    // 1. Define the specific target and the generic fallback
    const specificList = genreEntry.book; 
    const fallbackList = genreEntry.book === 'non-fiction' ? "combined-print-and-e-book-nonfiction" : "combined-print-and-e-book-fiction";

    try {
      // 2. Attempt the specific "Vibe" fetch
      const res = await fetch(`https://api.nytimes.com/svc/books/v3/lists/current/${specificList}.json?api-key=${NYT_KEY}`);
      const data = await res.json();

      // If the list exists and has books, return one!
      if (data.results && data.results.books && data.results.books.length > 0) {
        return formatBookData(data.results.books[Math.floor(Math.random() * data.results.books.length)]);
      } 
      
      // If we got a response but the list is empty, trigger the fallback manually
      throw new Error("Specific list empty");

    } catch (error) {
      console.warn(`Falling back to ${fallbackList} because ${specificList} failed.`);

      // 3. The Fallback Fetch (The reliable weekly charts)
      const res = await fetch(`https://api.nytimes.com/svc/books/v3/lists/current/${fallbackList}.json?api-key=${NYT_KEY}`);
      const data = await res.json();
      const book = data.results.books[Math.floor(Math.random() * data.results.books.length)];

      return formatBookData(book);
    }
  }
};

// Helper function to keep the code DRY (Don't Repeat Yourself)
const formatBookData = (book) => ({
  type: 'book',
  title: book.title.toLowerCase().split(' ').map(s => s.charAt(0).toUpperCase() + s.substring(1)).join(' '),
  author: book.author,
  image: book.book_image,
  description: book.description || "A New York Times Bestseller.",
  link: book.amazon_product_url,
  rank: book.rank
});

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
      strDrinkThumb: "https://images.pexels.com/photos/6487129/pexels-photo-6487129.jpeg" 
    };
  }
};