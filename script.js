import quotes from "./src/data/quotes.js";
import {
  toggleFavoriteIcon,
  renderFavorites,
} from "./src/handlers/favorites.js";
import { toggleTheme, applyTheme } from "./src/handlers/theme.js";
import { toggleFavoriteStatus } from "./src/handlers/quote.js";
import { getRandomint } from "./src/utils/math.js";

// DOM elements
const generateBtn = document.getElementById("generate-btn");
const favoriteButton = document.getElementById("favorite-btn");
const favoritesField = document.getElementById("favorites-field");
let lastIndex = -1;

const quoteElement = document.getElementById("quote");
const quoteAuthorElement = document.getElementById("quote-author");

function generateRandomQuote() {
  const { quote, author, favorite, index } = getRandomint(quotes, lastIndex);
  lastIndex = index;
  quoteElement.textContent = `"${quote}"`;
  quoteAuthorElement.textContent = author;
  toggleFavoriteIcon(favorite, favoriteButton);
}

function toggleFavorite(index) {
  const isFavorite = toggleFavoriteStatus(quotes, index);
  toggleFavoriteIcon(isFavorite, favoriteButton);
  renderFavorites(quotes, favoritesField, handleDeleteFavorite);
}

function handleDeleteFavorite(index) {
  quotes[index].favorite = false;
  renderFavorites(quotes, favoritesField, handleDeleteFavorite);
  // Optionally, update the main quote's star if it's the current one
  if (lastIndex === index) {
    toggleFavoriteIcon(false, favoriteButton);
  }
}

// Theme logic
const themeBtn = document.getElementById("theme-btn");
const themeImg = document.getElementById("themeimg");
applyTheme(themeImg);
themeBtn.addEventListener("click", () => toggleTheme(themeImg));

// Event listeners
generateBtn.addEventListener("click", generateRandomQuote);
favoriteButton.addEventListener("click", () => toggleFavorite(lastIndex));

// Initial render of favorites
renderFavorites(quotes, favoritesField, handleDeleteFavorite);
