import axios from "axios";

/* ------ Exercises: Level 1 ------- */

// 1: What is HTTP request?
// An HTTP request is an action to be performed on a resource identified by a given Request-URL.

// 2: What are the most common HTTP requests?
// GET

// 3: What is fetch?
// JavaScript provides a fetch API to make HTTP requests.

// 4: What is axios?
// Axios is a third party package and we need to install it using npm.

// 5: What is the difference between fetch and axios?
/*
Benefits of axios:
  -Transformers: allow performing transforms on data before request is made or after response is received
  -Interceptors: allow you to alter the request or response entirely (headers as well). also perform async operations before request is made or before Promise settles
  -Built-in XSRF protection
*/

// 6: Do you prefer fetch to axios for make HTTP requests?
// axios

/* ----- Exercises: Level 2 ----- */
async function getCats() {
  try {
    const response = await axios.get("https://api.thecatapi.com/v1/breeds");
    console.log(response);
  } catch (error) {
    console.error(error);
  }
}

getCats();
