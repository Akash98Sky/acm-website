import { Component } from 'react';
import { EducationModel } from '../../models/info_models';

interface PositionsProps {
    educations: EducationModel[];
}

export default class Positions extends Component<PositionsProps> {
    buildSection(title: string, sub: string, date: string) {
        return (
            <div className="grid py-8 sm:grid-cols-4" key={title}>
                <div className="mb-4 sm:mb-0">
                    <div className="space-y-1 text-s font-semibold tracking-wide uppercase">
                        <p className="text-gray-600">{date}</p>
                    </div>
                </div>
                <div className="sm:col-span-3 lg:col-span-2">
                    <div className="mb-3">
                        <a
                            href="/"
                            aria-label="Article"
                            className="inline-block text-black transition-colors duration-200 hover:text-deep-purple-accent-700"
                        >
                            <p className="text-xl font-extrabold leading-none sm:text-2xl xl:text-2xl">
                                {title}
                            </p>
                        </a>
                    </div>
                    <p className="text-gray-700">
                        {sub}
                    </p>
                </div>
            </div>
        );
    }

    render() {
        return (
            <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
                <div className="flex flex-col text-center w-full mb-20">
                    <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Education</h1>
                </div>
                <div className="mb-10 border-t border-b divide-y">
                    {
                        this.props.educations.map((edu) => (
                            this.buildSection(edu.degree, edu.from, edu.year)
                        ))
                    }
                </div>
            </div>
        );
    }
}