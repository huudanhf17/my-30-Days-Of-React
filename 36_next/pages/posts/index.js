import Link from "next/link";
import { Card } from "react-bootstrap";
import Layout from "../../components/Layout";
import { getPosts } from "../../lib/post";

// const posts = [
//   { id: 1, title: "Post 1", body: "My Post 1 body" },
//   { id: 2, title: "Post 2", body: "My Post 2 body" },
// ];

function index({ posts }) {
  return (
    <Layout>
      {posts.map((post) => (
        <Card key={post.id} className="my-3 shadow rounded">
          <Card.Body>
            <Card.Title>
              {post.id} -- {post.title}
            </Card.Title>
            <Card.Text>{post.body}</Card.Text>
            <Link href={`/posts/${post.id}`} passHref>
              <Card.Link>See more</Card.Link>
            </Link>
          </Card.Body>
        </Card>
      ))}
    </Layout>
  );
}

//GET static data from backend /db /api
export const getStaticProps = async () => {
  const posts = await getPosts(10);

  return {
    props: {
      posts,
    },
  };
};

export default index;
