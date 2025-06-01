import { GetStaticPropsContext } from 'next';
import Head from 'next/head';
import React from 'react';
import LinkOr from '../../components/linkOr';
import { server } from '../../configs';
import { PaperModel } from '../../models/paper_model';
import Link from 'next/link';

export default function Papers(props: { papers: PaperModel[]; }) {
    const PaperItem = (props: { paper: PaperModel; }) => {
        return (
            <li>
                <LinkOr href={props.paper.url}>
                    <Link href="#" className="block hover:bg-hover-100" target="_blank">
                        <div className="container mx-auto px-4 py-4 sm:px-6">
                            <div className="flex items-center justify-between">
                                <p className="text-sm md:text-base text-gray-700 text-justify">
                                    {props.paper.title}
                                </p>
                            </div>
                            <div className="mt-2 sm:flex sm:justify-between">
                                <div className="sm:flex">
                                    <p className="flex items-center text-sm font-light text-gray-500">
                                        <span>{props.paper.subTitle}</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Link> 
                </LinkOr>
            </li>
        );
    };

    return (
        <div>
            <Head>
                <title>ACM - Conference Papers</title>
            </Head>

            <div className="px-4 py-5 sm:px-6">
                <h3 className="text-xl leading-6 font-medium text-center">
                    Conference Papers
                    <div className="mx-auto w-2/5 pt-3 border-b-2 border-green-500 opacity-25"></div>
                </h3>
            </div>
            <div className="bg-white shadow overflow-hidden sm:rounded-md">
                <ul className="divide-y divide-gray-200">
                    {props.papers.map((paper: PaperModel) => (
                        <PaperItem key={paper.title} paper={paper} />
                    ))}
                </ul>
            </div>
        </div>
    );
}

export const getStaticProps = async (_: GetStaticPropsContext) => {
    const res = await fetch(`${server}/api/papers`);
    let papers = [];

    if (res.ok) {
        const data = await res.json();
        papers = data.papers;
    }

    return {
        props: {
            papers
        }
    };
};
