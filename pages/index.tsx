import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import { Hero, Positions } from '../components/home';
import strings from "../constants/strings";

export default function Home(props: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <div>
      <Head>
        <title>ACM</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Hero {...props} />

      <Positions {...props} />

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

