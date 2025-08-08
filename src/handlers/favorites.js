export function toggleFavoriteIcon(isFavorite, el) {
  el.classList.toggle("fa", isFavorite);
  el.classList.toggle("far", !isFavorite);
}
export function renderFavorites(quotes, favoritesField) {
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
