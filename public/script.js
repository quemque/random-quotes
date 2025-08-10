import { toggleFavoriteIcon, renderFavorites } from "./handlers/favorites.js";
import { toggleTheme, applyTheme } from "./handlers/theme.js";
import { toggleFavoriteStatus } from "./handlers/quote.js";

// DOM elements
const generateBtn = document.getElementById("generate-btn");
const favoriteButton = document.getElementById("favorite-btn");
const favoritesField = document.getElementById("favorites-field");
const quoteElement = document.getElementById("quote");
const quoteAuthorElement = document.getElementById("quote-author");

// Store quotes in memory
let quotes = [];
let currentQuote = null;

// Fetch quotes from API
async function fetchRandomQuote() {
  try {
    const response = await fetch("/api/quote");

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (data.fallback) {
      console.warn("Using fallback quote:", data.error);
    }

    return {
      quote: data.content,
      author: data.author,
      favorite: false,
      id: data.id,
    };
  } catch (error) {
    console.error("Fetch error:", error);
    return {
      quote: "Failed to load quote. Please try again later.",
      author: "System",
      favorite: false,
      id: "error-" + Date.now(),
    };
  }
}

async function generateRandomQuote() {
  currentQuote = await fetchRandomQuote();

  const { quote, author } = currentQuote;
  quoteElement.textContent = `"${quote}"`;
  quoteAuthorElement.textContent = author;

  const isFavorite = quotes.some((q) => q.id === currentQuote.id && q.favorite);
  toggleFavoriteIcon(isFavorite, favoriteButton);

  if (!quotes.some((q) => q.id === currentQuote.id)) {
    quotes.push({ ...currentQuote });
  }
}

function toggleFavorite() {
  if (!currentQuote) return;

  const quoteIndex = quotes.findIndex((q) => q.id === currentQuote.id);

  if (quoteIndex === -1) {
    quotes.push({ ...currentQuote });
  }

  const isFavorite = toggleFavoriteStatus(quotes, quoteIndex);
  toggleFavoriteIcon(isFavorite, favoriteButton);
  renderFavorites(quotes, favoritesField, handleDeleteFavorite);
}

function handleDeleteFavorite(index) {
  quotes[index].favorite = false;
  renderFavorites(quotes, favoritesField, handleDeleteFavorite);

  if (currentQuote && quotes[index].id === currentQuote.id) {
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
favoriteButton.addEventListener("click", toggleFavorite);

// Initial render of favorites (empty)
renderFavorites(quotes, favoritesField, handleDeleteFavorite);
