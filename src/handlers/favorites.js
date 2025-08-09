export function toggleFavoriteIcon(isFavorite, el) {
  el.classList.toggle("fa", isFavorite);
  el.classList.toggle("far", !isFavorite);
}

export function renderFavorites(quotes, favoritesField, onDelete) {
  favoritesField.innerHTML = "";
  const favoriteQuotes = quotes
    .map((q, i) => ({ ...q, index: i }))
    .filter((q) => q.favorite);

  if (favoriteQuotes.length === 0) {
    favoritesField.style.display = "none";
    return;
  }

  favoritesField.style.display = "flex";
  favoriteQuotes.forEach(({ quote, author, index }) => {
    const card = document.createElement("div");
    card.className = "favorite-card";
    card.innerHTML = `
      <div class="favorite-card-quote">"${quote}"</div>
      <div class="favorite-card-author">${author}</div>
      <button class="delete-favorite-btn" data-index="${index}" title="Remove from favorites">
        <i class="fa fa-trash"></i>
      </button>
    `;
    favoritesField.appendChild(card);
  });

  // Attach delete event listeners
  favoritesField.querySelectorAll(".delete-favorite-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const idx = parseInt(btn.getAttribute("data-index"), 10);
      if (onDelete) onDelete(idx);
    });
  });
}
