import quotes from "./src/data/quotes.js";
import { toggleFavoriteIcon } from "./src/handlers/favorites.js";
import { toggleTheme, applyTheme } from "./src/handlers/theme.js";

// DOM elements
const generateBtn = document.getElementById("generate-btn");
const favoritesField = document.getElementById("favorites-field");
const favoriteButton = document.getElementById("favorite-btn");

// Generate random quote
let lastIndex = -1;

const quoteElement = document.getElementById("quote");
const quoteAuthorElement = document.getElementById("quote-author");
function generateRandomQuote() {
  let randomIndex;
  do {
    randomIndex = Math.floor(Math.random() * quotes.length);
  } while (randomIndex === lastIndex && quotes.length > 1);

  lastIndex = randomIndex;
  const { quote, author, favorite } = quotes[randomIndex];

  quoteElement.textContent = `"${quote}"`;
  quoteAuthorElement.textContent = author;

  toggleFavoriteIcon(favorite, favoriteButton);
}

// Toggle favorite status
function toggleFavorite(index) {
  if (index === null || index === undefined) return;

  quotes[index].favorite = !quotes[index].favorite;
  toggleFavoriteIcon(quotes[index].favorite, favoriteButton);
  renderFavorites();
}

// Render favorite quotes
function renderFavorites() {
  favoritesField.innerHTML = "";
  const favoriteQuotes = quotes.filter((q) => q.favorite);

  if (favoriteQuotes.length === 0) {
    favoritesField.style.display = "none";
    return;
  }

  favoritesField.style.display = "flex";
  favoriteQuotes.forEach(({ quote, author }) => {
    const card = document.createElement("div");
    card.className = "favorite-card";
    card.innerHTML = `
      <div class="favorite-card-quote">"${quote}"</div>
      <div class="favorite-card-author">${author}</div>
    `;
    favoritesField.appendChild(card);
  });
}

// Toggle theme
const themeBtn = document.getElementById("theme-btn");
const themeImg = document.getElementById("themeimg");
applyTheme(themeImg);
themeBtn.addEventListener("click", () => toggleTheme(themeImg));

// Event listeners
generateBtn.addEventListener("click", generateRandomQuote);
favoriteButton.addEventListener("click", () => toggleFavorite(lastIndex));
