const quotes = [
  {
    quote: "The only way to do great work is to love what you do",
    author: "Steve Jobs",
  },
  {
    quote: "Innovation distinguishes between a leader and a follower",
    author: "Steve Jobs",
  },
  {
    quote: "Your time is limited, so don't waste it living someone else's life",
    author: "Steve Jobs",
  },
  {
    quote:
      "Success is not final, failure is not fatal: it is the courage to continue that counts",
    author: "Winston Churchill",
  },
  {
    quote: "Believe you can and you're halfway there",
    author: "Theodore Roosevelt",
  },
  {
    quote: "I have not failed. I've just found 10,000 ways that won't work",
    author: "Thomas Edison",
  },
  {
    quote: "You miss 100% of the shots you don't take",
    author: "Wayne Gretzky",
  },
  {
    quote: "Whether you think you can or you think you can't, you're right",
    author: "Henry Ford",
  },
  {
    quote:
      "The future belongs to those who believe in the beauty of their dreams",
    author: "Eleanor Roosevelt",
  },
  {
    quote: "Do what you can, with what you have, where you are",
    author: "Theodore Roosevelt",
  },
];

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
  const { quote, author } = quotes[randomIndex];

  quoteElement.textContent = '"' + quote + '"';
  quoteAuthorElement.textContent = author;
}

generateBtn.addEventListener("click", generateRandomQuote);
