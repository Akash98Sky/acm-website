import React, { MouseEventHandler, useState } from "react";
import Link from 'next/link';

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);

    const handleMenuClick: MouseEventHandler<HTMLElement> = (event) => {
        setMenuOpen(!menuOpen);
    };

    const NavButton = (props: { href: string, title: string; }) => (
        <Link {...props} className='lg:inline-flex lg:w-auto w-full px-3 py-2 rounded font-bold items-center justify-center text-white hover:bg-tertiary hover:text-gray-100 hover:shadow' onClick={handleMenuClick}>
            {props.title}
        </Link>
    );


    return (
        <nav className='flex items-center flex-wrap bg-primary shadow p-3 '>
            <Link href='/' className="inline-flex items-center p-2 mr-4 text-2xl font-bold text-gray-100 dark:text-white lg:text-3xl hover:text-gray-200">A.C.M.</Link>
            <button className='inline-flex m-1 p-2 hover:bg-tertiary lg:hidden text-black ml-auto hover:text-black outline-none'
                onClick={handleMenuClick}
            >
                <svg
                    className='w-6 h-6'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                    xmlns='http://www.w3.org/2000/svg'
                >
                    <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M4 6h16M4 12h16M4 18h16'
                    />
                </svg>
            </button>
            {/*Note that in this div we will use a ternary operator to decide whether or not to display the content of the div  */}
            <div className="w-full lg:inline-flex lg:flex-grow lg:w-auto" hidden={!menuOpen}>
                <div className='lg:inline-flex lg:flex-row lg:ml-auto lg:w-auto w-full lg:items-center items-start  flex flex-col lg:h-auto'>
                    <NavButton href="/journals" title="Journals" />
                    <NavButton href="/papers" title="Papers" />
                    <NavButton href="/about" title="About" />
                </div>
            </div>
        </nav>
    );
}
