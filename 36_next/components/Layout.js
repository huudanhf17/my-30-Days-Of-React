import Head from "next/head";
import { Container } from "react-bootstrap";
import NavBarMenu from "./NavBarMenu";

function Layout({ children }) {
  return (
    <Container>
      <Head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Next App</title>
      </Head>

      <header>
        <NavBarMenu></NavBarMenu>
      </header>

      <main>{children}</main>
    </Container>
  );
}

export default Layout;
