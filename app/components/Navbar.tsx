"use client";
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React from 'react'

const tabs = [
    { name: "first", href: "/first" },
    { name: "second", href: "/second" },
    { name: "third", href: "/third" },
];

const Navbar = () => {
    const pathname = usePathname();
    return (
        <nav className='absolute bottom-4 flex items-center justify-center justify-self-center select-none'>
            <ul className='flex space-x-10 text-center tracking-wider font-light text-2xl uppercase'>
                {tabs.map(tab => (
                    <Link
                        href={tab.href}
                        key={tab.name}
                        className={`${pathname === tab.href ? "font-normal underline underline-offset-4 border-l-8  bg-teal-200 text-teal-950 hover:bg-teal-200 hover:text-teal-950 shadow-lg shadow-teal-950 -translate-y-2"
                            : "text-teal-200"
                            } w-32 text-center hover:bg-cyan-700 hover:text-cyan-200 transition-all py-2 duration-75`}
                    >
                        {tab.name}
                    </Link>
                ))}
            </ul>
        </nav>
    )
}

export default Navbar
