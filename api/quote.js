import https from "https";
import fetch from "node-fetch";

// Отключаем проверку SSL (только для этого запроса)
const agent = new https.Agent({
  rejectUnauthorized: false,
});

export default async (req, res) => {
  try {
    const response = await fetch("https://api.quotable.io/random", {
      agent,
      headers: {
        "User-Agent": "random-quotes-vercel-app",
      },
    });

    if (!response.ok) throw new Error(`API error: ${response.status}`);

    const data = await response.json();

    res.status(200).json({
      content: data.content,
      author: data.author,
      id: data._id,
      source: "quotable",
    });
  } catch (error) {
    console.error("API Error:", error);

    // Локальные цитаты как fallback
    const fallbacks = [
      {
        content: "The only way to do great work is to love what you do.",
        author: "Steve Jobs",
        id: "fallback-1",
      },
      {
        content: "Life is what happens when you're busy making other plans.",
        author: "John Lennon",
        id: "fallback-2",
      },
    ];

    const fallback = fallbacks[Math.floor(Math.random() * fallbacks.length)];

    res.status(200).json({
      ...fallback,
      error: error.message,
      fallback: true,
    });
  }
};
