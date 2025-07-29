import quotes from "./quotes.js";

//generate quote
const quoteElement = document.getElementById("quote");
const generateBtn = document.getElementById("generate-btn");
const quoteAuthorElement = document.getElementById("quote-author");
let lastIndex = -1;

function generateRandomQuote() {
  let randomIndex;
  do {
    randomIndex = Math.floor(Math.random() * quotes.length);
  } while (randomIndex === lastIndex && quotes.length > 1);
  lastIndex = randomIndex;
  currentQuoteIndex = randomIndex;
  const { quote, author } = quotes[randomIndex];

  quoteElement.textContent = '"' + quote + '"';
  quoteAuthorElement.textContent = author;
}

generateBtn.addEventListener("click", generateRandomQuote);

//favorite card
const favoritesField = document.getElementById("favorites-field");

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

//favorite quote
let currentQuoteIndex = null;
const favoritebutton = document.getElementById("favorite-btn");
function toggleFavorite(index) {
  quotes[index].favorite = !quotes[index].favorite;
  renderFavorites();
}
renderFavorites();
favoritebutton.addEventListener("click", () => {
  if (currentQuoteIndex != null) {
    toggleFavorite(currentQuoteIndex);
  }
});

//theme
const themeBtn = document.getElementById("theme-btn");

function toggleTheme() {
  document.body.classList.toggle("light-theme");

  const isLight = document.body.classList.contains("light-theme");
  localStorage.setItem("lightTheme", isLight);
}

if (localStorage.getItem("lightTheme") === "true") {
  document.body.classList.add("light-theme");
}

themeBtn.addEventListener("click", toggleTheme);
