import axios from "axios";

export const getPosts = async (limit) => {
  try {
    const res = await axios.get(
      `https://jsonplaceholder.typicode.com/posts?_limit=${limit}`
    );
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const getPostIds = async (limit) => {
  const posts = await getPosts(limit);

  return posts.map((post) => ({
    params: {
      id: `${post.id}`,
    },
  }));
  // return posts.map((post) => `/posts/${post.id}`);
};

export const getPostById = async (id) => {
  try {
    const res = await axios.get(
      `https://jsonplaceholder.typicode.com/posts/${id}`
    );
    return res.data;
  } catch (err) {
    console.log(err);
  }
};
