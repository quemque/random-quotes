export function getRandomint(quotes, lastIndex) {
  let randomIndex;
  do {
    randomIndex = Math.floor(Math.random() * quotes.length);
  } while (randomIndex === lastIndex && quotes.length > 1);

  return { ...quotes[randomIndex], index: randomIndex };
}
