export default async (req, res) => {
  try {
    const apiResponse = await fetch("https://api.quotable.io/random");
    if (!apiResponse.ok) throw new Error("Quotable API failed");

    const data = await apiResponse.json();
    res.status(200).json({
      content: data.content,
      author: data.author,
      _id: data._id,
    });
  } catch (error) {
    console.error("API Error:", error);
    res.status(500).json({
      error: "Failed to fetch quote",
      details: error.message,
    });
  }
};
