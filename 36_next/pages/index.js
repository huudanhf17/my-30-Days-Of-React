import Head from "next/head";
import Layout from "../components/Layout";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import { ApolloClient, gql, InMemoryCache } from "@apollo/client";
import { useState } from "react";
import Characters from "../components/Characters";
import { Form, FormControl, Button } from "react-bootstrap";

export default function Home(results) {
  const intialState = results;
  const [characters, setCharacters] = useState(intialState.characters);
  const [search, setSearch] = useState("");

  return (
    <div>
      <Layout>
        <h1>Next App</h1>

        <Form
          inline
          onSubmit={async (e) => {
            e.preventDefault();
            const res = await fetch("/api/SearchCharaters", {
              method: "post",
              body: search,
            });

            const { characters, error } = await res.json();

            if (error) {
              console.log(error);
            } else {
              setCharacters(characters);
            }
          }}
        >
          <FormControl
            type="text"
            placeholder="Search"
            className="mr-sm-2"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button variant="outline-success">Search</Button>
        </Form>
        <Characters characters={characters}></Characters>
      </Layout>
    </div>
  );
}

export async function getStaticProps() {
  const client = new ApolloClient({
    uri: "https://rickandmortyapi.com/graphql",
    cache: new InMemoryCache(),
  });

  const { data } = await client.query({
    query: gql`
      query {
        characters(page: 1) {
          info {
            count
            pages
          }
          results {
            name
            id
            location {
              id
              name
            }
            origin {
              id
              name
            }
            episode {
              id
              episode
              air_date
            }
            image
          }
        }
      }
    `,
  });

  return {
    props: {
      characters: data.characters.results,
    },
  };
}
