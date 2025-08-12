import { toggleFavoriteIcon, renderFavorites } from "./handlers/favorites.js";
import { toggleTheme, applyTheme } from "./handlers/theme.js";
import { toggleFavoriteStatus } from "./handlers/quote.js";
import { fallbackq } from "./fallbackq.js";

// DOM elements
const generateBtn = document.getElementById("generate-btn");
const favoriteButton = document.getElementById("favorite-btn");
const favoritesField = document.getElementById("favorites-field");
const quoteElement = document.getElementById("quote");
const quoteAuthorElement = document.getElementById("quote-author");

// Store quotes in memory
let quotes = [];
let quoteQueue = [];
let currentQuote = null;

// Fetch quotes from API
// script.js
async function fetchMultipleQuotes(count = 10) {
  try {
    const responses = await Promise.all(
      Array(count)
        .fill()
        .map(() => fetch("/api/quote"))
    );

    const data = await Promise.all(
      responses.map((r) => {
        if (!r.ok) throw new Error(`HTTP error! status: ${r.status}`);
        return r.json();
      })
    );

    return data.map((item, i) => ({
      quote: item.content,
      author: item.author,
      favorite: false,
      id: item.id || `quote-${Date.now()}-${i}`,
      fallback: item.fallback || false,
    }));
  } catch (error) {
    console.error("Fetch error:", error);
    return Array(count)
      .fill()
      .map((_, i) => ({
        quote: "Failed to load quote. Please try again later.",
        author: "System",
        favorite: false,
        id: `error-${Date.now()}-${i}`,
        fallback: true,
      }));
  }
}

async function generateRandomQuote() {
  //console.log(quoteQueue.length);
  if (quoteQueue.length < 3) {
    fetchMultipleQuotes(5)
      .then((newQuotes) => {
        quoteQueue.push(...newQuotes);
        console.log("Added new quotes to queue:", newQuotes.length);
      })
      .catch((error) => {
        console.error("Failed to fetch more quotes:", error);
      });
  }

  currentQuote = quoteQueue.shift();

  if (!currentQuote) {
    console.log("fallback");

    const ranfallbackq =
      fallbackq[Math.floor(Math.random() * fallbackq.length)];
    quoteElement.textContent = `"${ranfallbackq.quote}"`;
    quoteAuthorElement.textContent = ranfallbackq.author;
    favoriteButton.style.display = "inline-block";
    currentQuote = ranfallbackq;
    return;
  }

  const { quote, author } = currentQuote;
  quoteElement.textContent = `"${quote}"`;
  quoteAuthorElement.textContent = author;

  const isFavorite = quotes.some((q) => q.id === currentQuote.id && q.favorite);
  toggleFavoriteIcon(isFavorite, favoriteButton);

  if (!quotes.some((q) => q.id === currentQuote.id)) {
    quotes.push({ ...currentQuote });
  }
  favoriteButton.style.display = "inline-block";
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
//initialization
async function initQuotesOnLoad() {
  const newQuotes = await fetchMultipleQuotes(5);
  quoteQueue.push(...newQuotes);
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
initQuotesOnLoad();
