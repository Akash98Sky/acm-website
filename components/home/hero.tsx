import React, { useState } from 'react';
import { DesignationIcon, InstituteIcon, LocationIcon } from '../icons';

interface HeroProps {
    fullName: string;
    avatarUrl: string;
    degrees: string[];
    designation: string;
    department: string;
    university: string;
    contact: {
        mail: string;
        ph_no: string;
        alt_ph_no: string;
    };
}

export default function Hero(props: HeroProps) {
    const [showModal, setShowModal] = useState(false);
    const getDesc = () => {
        return `${props.designation}, ${props.department}`;
    };

    const GetInTouch = () => (
        <section className="absolute max-w-full py-20" hidden={!showModal}>
            <div className="relative mx-auto bg-white rounded-lg shadow-xl">
                <p className="text-center text-gray-700 font-bold text-4xl">Get in touch</p>

                <div className="grid grid-cols-1 gap-6 mt-6 sm:grid-cols-2 md:grid-cols-3">
                    <a className="flex flex-col items-center px-4 text-gray-700 rounded-md dark:text-gray-200 hover:bg-blue-200 dark:hover:bg-blue-500">
                        <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                        </svg>

                        <span className="mt-2">+91 {props.contact.ph_no}</span>
                    </a>

                    <a className="flex flex-col items-center px-4 text-gray-700 rounded-md dark:text-gray-200 hover:bg-blue-200 dark:hover:bg-blue-500">
                        <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                        </svg>

                        <span className="mt-2">+91 {props.contact.alt_ph_no}</span>
                    </a>

                    <a href={`mailto:${props.contact.mail}`} className="flex flex-col items-center px-4 text-gray-700 rounded-md dark:text-gray-200 hover:bg-blue-200 dark:hover:bg-blue-500">
                        <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                        </svg>

                        <span className="mt-2">{props.contact.mail}</span>
                    </a>
                </div>
                <div className="flex justify-center items-center mt-6">
                    <button className="bg-red-500 text-white font-bold px-8 py-2 rounded-lg hover:opacity-75" onClick={(_) => setShowModal(false)}>
                        close
                    </button>
                </div>
                <div className="absolute w-full">
                    <svg
                        className="fill-current text-red-500"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 1440 320"
                    >
                        <path
                            fillOpacity="1"
                            d="M0,64L120,90.7C240,117,480,171,720,176C960,181,1200,139,1320,117.3L1440,
96L1440,320L1320,320C1200,320,960,320,720,
320C480,320,240,320,120,320L0,320Z"
                        ></path>
                    </svg>
                    <div className="h-6 w-full bg-red-500 rounded-b-lg"></div>
                </div>
            </div>
        </section>
    );

    return (
        <div className="antialiased text-gray-900 leading-normal tracking-wider bg-cover" style={{ backgroundImage: "url('https://source.unsplash.com/1L71sPT5XKc')" }}>
            <div className="max-w-4xl flex items-center h-auto lg:h-screen flex-wrap mx-auto py-16 lg:my-0">
                <div id="profile" className="w-full lg:w-3/5 rounded-lg lg:rounded-l-lg lg:rounded-r-none shadow-2xl bg-white opacity-75 mx-6 lg:mx-0">


                    <div className="p-4 md:p-12 text-center lg:text-left">
                        <div className="block lg:hidden rounded-full shadow-xl mx-auto -mt-16 h-48 w-48 bg-cover bg-center" style={{ backgroundImage: `url('${props.avatarUrl}')` }}></div>

                        <h1 className="text-3xl font-bold pt-8 lg:pt-0">{props.fullName}</h1>
                        <div className="mx-auto lg:mx-0 w-4/5 pt-3 border-b-2 border-green-500 opacity-25"></div>
                        <p className="pt-4 text-xs sm:text-base font-bold flex items-center justify-start md:justify-center lg:justify-start"><DesignationIcon /> {getDesc()}</p>
                        <p className="pt-2 text-gray-600 text-xs lg:text-sm flex items-center justify-start md:justify-center lg:justify-start"><InstituteIcon /> {props.university}</p>
                        <p className="pt-2 text-gray-600 text-xs lg:text-sm flex items-center justify-start md:justify-center lg:justify-start"><LocationIcon /> Burdwan, West Bangal - 713104</p>
                        <p className="pt-8 text-sm">
                            {/* Totally optional short description about yourself, what you do and so on. */}
                        </p>

                        <a className="mt-12 mb-8 bg-secondary hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full" onClick={(_) => setShowModal(true)}>
                            Get In Touch
                        </a>
                    </div>

                </div>

                <div className="w-full lg:w-2/5">
                    <img src={props.avatarUrl} className="rounded-none lg:rounded-lg shadow-2xl hidden lg:block" />
                </div>
                <GetInTouch />
            </div>
        </div>
    );
}