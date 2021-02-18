import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import { Hero } from '../components/home';
import strings from "../constants/strings";
import styles from '../styles/Home.module.css';

export default function Home(props: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <div>
      <Head>
        <title>ACM</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Hero {...props} />

    </div>
  );
}

export const getStaticProps = async (context: GetStaticPropsContext) => {
  return {
    props: {
      fullName: strings.name.full,
      ...strings.details.teaching
    }
  };
};

