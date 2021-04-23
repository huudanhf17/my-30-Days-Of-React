import { Card } from "react-bootstrap";
import Layout from "../../components/Layout";
import { getPosts } from "../../lib/post";

// const posts = [
//   { id: 1, title: "Post 1", body: "My Post 1 body" },
//   { id: 2, title: "Post 2", body: "My Post 2 body" },
// ];

function index(posts) {
  return (
    <Layout>
      {posts.map((post) => (
        <Card key={post.id}>
          <Card.Body>
            <Card.Title>{post.title}</Card.Title>
            <Card.Text>{post.body}</Card.Text>
          </Card.Body>
        </Card>
      ))}
    </Layout>
  );
}

//GET static data from backend /db /api
export const getStaticProps = async () => {
  const posts = await getPosts();

  return {
    props: {
      posts,
    },
  };
};

export default index;
