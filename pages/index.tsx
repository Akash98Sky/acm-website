import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import { Hero, Positions, ResearchInterests, Scholars } from '../components/home';
import strings from "../constants/strings";

export default function Home(props: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <div>
      <Hero {...props} />

      <Positions {...props} />

      <ResearchInterests {...props} />

      <Scholars />

    </div>
  );
}

export const getStaticProps = async (_: GetStaticPropsContext) => {
  return {
    props: {
      fullName: strings.name.full,
      avatarUrl: strings.details.avatarUrl,
      research: strings.research,
      educations: strings.educations,
      ...strings.details,
      ...strings.details.teaching
    }
  };
};

