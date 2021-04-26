import axios from "axios";

export const getRandomJoke = async () => {
  const res = await axios.get("https://api.chucknorris.io/jokes/random");

  return res.data;
};
