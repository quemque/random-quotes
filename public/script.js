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
  if (quoteQueue.length < 3) {
    fetchMultipleQuotes(5)
      .then((newQuotes) => {
        quoteQueue.push(...newQuotes);
      })
      .catch((error) => {
        console.error("Failed to fetch more quotes:", error);
      });
  }

  currentQuote = quoteQueue.shift();

  if (!currentQuote) {
    currentQuote = fallbackq[Math.floor(Math.random() * fallbackq.length)];
  }

  renderCurrentQuote();
  localStorage.setItem("currentquote", JSON.stringify(currentQuote));
}

function toggleFavorite() {
  if (!currentQuote) return;

  const quoteIndex = quotes.findIndex((q) => q.id === currentQuote.id);

  if (quoteIndex === -1) {
    quotes.push({ ...currentQuote });
  }

  const isFavorite = toggleFavoriteStatus(quotes, quoteIndex);

  //localStorage
  localStorage.setItem("quotes", JSON.stringify(quotes));
  localStorage.setItem("currentquote", JSON.stringify(currentQuote));

  toggleFavoriteIcon(isFavorite, favoriteButton);
  renderFavorites(quotes, favoritesField, handleDeleteFavorite);
}

function handleDeleteFavorite(index) {
  quotes[index].favorite = false;
  localStorage.setItem("quotes", JSON.stringify(quotes));
  renderFavorites(quotes, favoritesField, handleDeleteFavorite);

  if (currentQuote && quotes[index].id === currentQuote.id) {
    toggleFavoriteIcon(false, favoriteButton);
  }
}

function renderCurrentQuote() {
  if (!currentQuote) return;
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

// Theme logic
const themeBtn = document.getElementById("theme-btn");
const themeImg = document.getElementById("themeimg");
themeBtn.addEventListener("click", () => toggleTheme(themeImg));

// Event listeners
generateBtn.addEventListener("click", generateRandomQuote);
favoriteButton.addEventListener("click", toggleFavorite);

//initialization
async function initQuotesOnLoad() {
  applyTheme(themeImg);

  //current quote
  currentQuote = JSON.parse(localStorage.getItem("currentquote"));

  //favorite field
  let savedQuotes = JSON.parse(localStorage.getItem("quotes") || "[]");
  if (Array.isArray(savedQuotes)) {
    quotes = savedQuotes;
  }
  renderFavorites(quotes, favoritesField, handleDeleteFavorite);

  renderCurrentQuote();

  const newQuotes = await fetchMultipleQuotes(5);
  quoteQueue.push(...newQuotes);
}

initQuotesOnLoad();
