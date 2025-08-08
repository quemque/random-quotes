export function toggleFavoriteStatus(quotes, index) {
  if (index === null || index === undefined) return false;
  quotes[index].favorite = !quotes[index].favorite;
  return quotes[index].favorite;
}
