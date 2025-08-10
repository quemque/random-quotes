// api/quote.js
import fetch from "node-fetch";

export default async (request, response) => {
  // Логирование начала выполнения
  console.log("Start fetching quote");

  try {
    // 1. Делаем запрос к API
    const apiResponse = await fetch("https://api.quotable.io/random", {
      headers: {
        "User-Agent": "random-quotes-vercel-app",
      },
    });

    console.log("API response status:", apiResponse.status);

    // 2. Проверяем статус
    if (!apiResponse.ok) {
      throw new Error(`API responded with ${apiResponse.status}`);
    }

    // 3. Парсим данные
    const data = await apiResponse.json();
    console.log("Received data:", data);

    // 4. Форматируем ответ
    response.setHeader("Content-Type", "application/json");
    response.status(200).json({
      success: true,
      content: data.content,
      author: data.author,
      id: data._id,
    });
  } catch (error) {
    // 5. Обработка ошибок
    console.error("Full error:", error);

    // Fallback данные
    const fallbackQuotes = [
      {
        content: "The best preparation for tomorrow is doing your best today.",
        author: "H. Jackson Brown Jr.",
        id: "fallback-1",
      },
      {
        content: "Life is what happens when you're busy making other plans.",
        author: "John Lennon",
        id: "fallback-2",
      },
    ];

    const randomFallback =
      fallbackQuotes[Math.floor(Math.random() * fallbackQuotes.length)];

    response.status(200).json({
      success: false,
      error: error.message,
      fallback: true,
      ...randomFallback,
    });
  }
};
