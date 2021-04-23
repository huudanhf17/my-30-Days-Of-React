import Head from "next/head";
import Layout from "../components/Layout";
import styles from "../styles/Home.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Layout>
        <h1>Next App</h1>
        <Link href="/about">About Page</Link>
      </Layout>
    </div>
  );
}
