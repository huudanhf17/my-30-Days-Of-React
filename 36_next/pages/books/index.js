import Layout from "../../components/Layout";
import { Button, Card } from "react-bootstrap";
import Link from "next/link";
import { getBooks } from "../../lib/book";

function Books({ books }) {
  return (
    <Layout>
      {books.map((book, index) => (
        <Card className="my-3 shadow" key={index}>
          <Card.Body>
            <Card.Title>{book.bookName}</Card.Title>
            <Card.Text>{book.bookContent}</Card.Text>
            <Link href="/">
              <Button variant="dark">Back</Button>
            </Link>
          </Card.Body>
        </Card>
      ))}
    </Layout>
  );
}

export const getStaticProps = async () => {
  const books = await getBooks();
  console.log(books);
  return {
    props: {
      books,
    },
  };
};

export default Books;
