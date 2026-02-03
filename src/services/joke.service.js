const axios = require("axios");

const getRandomJoke = async () => {
  try {
    const res = await axios.get(
      "https://official-joke-api.appspot.com/random_joke"
    );

    return `${res.data.setup}\n\n${res.data.punchline} 😄`;
  } catch (error) {
    console.error("Joke API error:", error.message);
    return "Oops! Joke server is taking a nap 😴";
  }
};

module.exports = { getRandomJoke };
