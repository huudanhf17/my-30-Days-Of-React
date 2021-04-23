import Link from "next/link";
import { Nav, Navbar } from "react-bootstrap";

function NavBarMenu(props) {
  return (
    <Navbar bg="dark" variant="dark">
      <Nav>
        <Link href="/" passHref>
          <Nav.Link>Home</Nav.Link>
        </Link>
      </Nav>

      <Nav>
        <Link href="/posts" passHref>
          <Nav.Link>Posts</Nav.Link>
        </Link>
      </Nav>

      <Nav>
        <Link href="/about" passHref>
          <Nav.Link>About</Nav.Link>
        </Link>
      </Nav>
    </Navbar>
  );
}

export default NavBarMenu;
