import axios from "axios";

export const getPosts = async () => {
  try {
    const res = await axios.get("https://jsonplaceholder.typicode.com/posts");
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const getPostIds = async () => {
  const posts = await getPosts();

  return posts.map((post) => `/posts/${post.id}`);
};
