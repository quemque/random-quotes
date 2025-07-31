import quotes from "./src/quotes.js";
import { toggleFavoriteIcon } from "./src/favoritesHandler.js";

// DOM elements
const quoteElement = document.getElementById("quote");
const generateBtn = document.getElementById("generate-btn");
const quoteAuthorElement = document.getElementById("quote-author");
const favoritesField = document.getElementById("favorites-field");
const favoriteButton = document.getElementById("favorite-btn");
const themeBtn = document.getElementById("theme-btn");

// State variables
let lastIndex = -1;
let currentQuoteIndex = null;

// Generate random quote
function generateRandomQuote() {
  let randomIndex;
  do {
    randomIndex = Math.floor(Math.random() * quotes.length);
  } while (randomIndex === lastIndex && quotes.length > 1);

  lastIndex = randomIndex;
  currentQuoteIndex = randomIndex;
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
function toggleTheme() {
  document.body.classList.toggle("light-theme");
  const isLight = document.body.classList.contains("light-theme");
  localStorage.setItem("lightTheme", isLight);
}

// Event listeners
generateBtn.addEventListener("click", generateRandomQuote);
favoriteButton.addEventListener("click", () =>
  toggleFavorite(currentQuoteIndex)
);
themeBtn.addEventListener("click", toggleTheme);

// Initialize
if (localStorage.getItem("lightTheme") === "true") {
  document.body.classList.add("light-theme");
}
