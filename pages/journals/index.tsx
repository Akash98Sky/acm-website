import React from 'react';
import Head from 'next/head';
import { PaperModel } from '../../models/paper_model';
import LinkOr from '../../components/linkOr';
import { GetStaticPropsContext } from 'next';
import { server } from '../../configs';

export default function Journals(props: { journals: PaperModel[]; }) {
    const JournalItem = (props: { journal: PaperModel; }) => {
        return (
            <li>
                <LinkOr href={props.journal.url}>
                    <a className="block hover:bg-hover-100" target="_blank">
                        <div className="container mx-auto px-4 py-4 sm:px-6">
                            <div className="flex items-center justify-between">
                                <p className="text-sm md:text-base text-gray-700 text-justify">
                                    {props.journal.title}
                                </p>
                            </div>
                            <div className="mt-2 sm:flex sm:justify-between">
                                <div className="sm:flex">
                                    <p className="flex items-center text-sm font-light text-gray-500">
                                        <span>{props.journal.subTitle}</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </a>
                </LinkOr>
            </li>
        );
    };

    return (
        <div>
            <Head>
                <title>ACM - Journal Articles</title>
            </Head>
            <div className="px-4 py-5 rounded-t sm:px-6">
                <h3 className="text-xl leading-6 font-medium text-center">
                    Journal Articles
                    <div className="mx-auto w-2/5 pt-3 border-b-2 border-green-500 opacity-25"></div>
                </h3>
            </div>
            <div className="bg-white shadow overflow-hidden sm:rounded-md">
                <ul className="divide-y divide-gray-200" >
                    {props.journals.map((journal: PaperModel) => (
                        <JournalItem key={journal.title} journal={journal} />
                    ))}
                </ul>
            </div>
        </div>
    );
}

export const getStaticProps = async (_: GetStaticPropsContext) => {
    const res = await fetch(`${server}/api/journals`);
    let journals = [];

    if (res.ok) {
        const data = await res.json();
        journals = data.journals;
    }

    return {
        props: {
            journals
        }
    };
};
