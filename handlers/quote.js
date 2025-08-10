export function toggleFavoriteStatus(quotes, index) {
  if (
    index === null ||
    index === undefined ||
    index < 0 ||
    index >= quotes.length
  )
    return false;
  quotes[index].favorite = !quotes[index].favorite;
  return quotes[index].favorite;
}
