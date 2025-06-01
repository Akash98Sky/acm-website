import Link from 'next/link';
import LinkOr from '../linkOr';

interface ResearchInterestsProps {
    research: {
        interests: { name: string, bg: string, url: string | undefined; }[];
    };
}

export default function ResearchInterests(props: ResearchInterestsProps) {
    return (
        <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
            <div className="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
                <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl md:mx-auto">
                    <span className="relative inline-block">
                        <svg
                            viewBox="0 0 52 24"
                            fill="currentColor"
                            className="absolute top-0 left-0 z-0 hidden w-32 -mt-8 -ml-20 text-blue-gray-100 lg:w-32 lg:-ml-28 lg:-mt-10 sm:block"
                        >
                            <defs>
                                <pattern
                                    id="903f4a9e-7ac3-441c-9613-04c15fcc0a14"
                                    x="0"
                                    y="0"
                                    width=".135"
                                    height=".30"
                                >
                                    <circle cx="1" cy="1" r=".7" />
                                </pattern>
                            </defs>
                            <rect
                                fill="url(#903f4a9e-7ac3-441c-9613-04c15fcc0a14)"
                                width="52"
                                height="24"
                            />
                        </svg>
                        <span className="relative">Research Interests</span>
                    </span>
                </h2>
            </div>
            <div className="grid grid-cols-2 gap-5 row-gap-6 mb-10 sm:grid-cols-3 lg:grid-cols-5">
                {
                    props.research.interests.map(interest => {
                        return (
                            <div className="py-4 md:p-8" key={interest.name}>
                                <LinkOr href={interest.url}>
                                    <Link href="#" className="relative bg-black shadow-lg hover:shadow-md rounded-lg group h-28 w-28 md:h-40 md:w-40 flex justify-center items-center" target="_blank">
                                        <div className="rounded-lg h-full w-full absolute z-10 bg-cover bg-center opacity-50 hover:opacity-20 transition-all duration-500 ease-in-out" style={{ backgroundImage: `url('${interest.bg}')` }}>
                                        </div>
                                        <p className="font-bold text-sm text-white text-center absolute z-20 pointer-events-none">
                                            {interest.name}
                                        </p>
                                    </Link> 
                                </LinkOr>
                            </div>
                        );
                    })
                }
            </div>
        </div>
    );
};