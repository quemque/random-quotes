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

async function generateRandomQuote() {
  try {
    const response = await fetch("/api/random-quote");
    if (!response.ok) throw new Error("Failed to fetch quote");

    const data = await response.json();

    quoteElement.textContent = `"${data.content}"`;
    quoteAuthorElement.textContent = data.author;
    toggleFavoriteIcon(false, favoriteButton);
  } catch (error) {
    console.error("Error fetching quote:", error);
    quoteElement.textContent = `"Oops! Couldn’t load a quote right now."`;
    quoteAuthorElement.textContent = "";
    toggleFavoriteIcon(false, favoriteButton);
  }
}

function toggleFavorite(index) {
  const isFavorite = toggleFavoriteStatus(quotes, index);
  toggleFavoriteIcon(isFavorite, favoriteButton);
  renderFavorites(quotes, favoritesField, handleDeleteFavorite);
}

function handleDeleteFavorite(index) {
  quotes[index].favorite = false;
  renderFavorites(quotes, favoritesField, handleDeleteFavorite);
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
