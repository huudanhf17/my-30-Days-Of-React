import Link from "next/link";
import { useRouter } from "next/router";
import { Spinner } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Layout from "../../components/Layout";
import { getPostById, getPostIds } from "../../lib/post";

const Post = ({ post }) => {
  const router = useRouter();

  if (router.isFallback) {
    return (
      <Spinner animation="border" role="status" variant="dark">
        <span className="sr-only">LOADING...</span>
      </Spinner>
    );
  }

  return (
    <Layout>
      <Card className="my-3 shadow">
        <Card.Body>
          <Card.Title>Single Post: {post.title}</Card.Title>
          <Card.Text>{post.body}</Card.Text>
          <Link href="/posts">
            <Button variant="dark">Back</Button>
          </Link>
        </Card.Body>
      </Card>
    </Layout>
  );
};

export const getStaticPaths = async () => {
  const paths = await getPostIds(5);
  console.log(paths);

  return {
    paths,
    //fallback: false, // bất kì path nào không return bởi getStaticPaths sẽ tới 404
    fallback: true, // path nào ko return ngay lập tức sẽ show trang "tạm thời" => đợi getStaticProps > reuturn trang hoàn chỉnh
  };
};

export const getStaticProps = async ({ params }) => {
  const post = await getPostById(params.id);

  return {
    props: {
      post,
    },
    revalidate: 1,
  };
};

export default Post;
