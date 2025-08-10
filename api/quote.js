import fetch from "node-fetch";

export default async (req, res) => {
  try {
    // 1. Делаем запрос к Quotable API
    const apiResponse = await fetch("https://api.quotable.io/random");

    // 2. Проверяем статус ответа
    if (!apiResponse.ok) {
      throw new Error(`Quotable API error: ${apiResponse.status}`);
    }

    // 3. Парсим JSON
    const data = await apiResponse.json();

    // 4. Возвращаем данные в нужном формате
    res.status(200).json({
      content: data.content,
      author: data.author,
      _id: data._id,
    });
  } catch (error) {
    // 5. Обработка ошибок
    console.error("API Error:", error);
    res.status(500).json({
      error: "Failed to fetch quote",
      details: error.message,
    });
  }
};
