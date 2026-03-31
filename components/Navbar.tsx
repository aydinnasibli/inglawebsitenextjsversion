"use client"
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Logo from '@/public/assets/logoingla.png'

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState<boolean>(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

    // Track scroll position to change header style
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Fix body scroll when mobile menu is open
    useEffect(() => {
        const originalStyle = window.getComputedStyle(document.body).overflow;
        if (mobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = originalStyle;
        }
        return () => {
            document.body.style.overflow = originalStyle;
        };
    }, [mobileMenuOpen]);

    const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
    const closeMenu = () => setMobileMenuOpen(false);

    useEffect(() => {
        const handleEscKeypress = (event: KeyboardEvent) => {
            if (event.key === 'Escape' && mobileMenuOpen) {
                closeMenu();
            }
        };
        window.addEventListener('keydown', handleEscKeypress);
        return () => window.removeEventListener('keydown', handleEscKeypress);
    }, [mobileMenuOpen]);

    useEffect(() => {
        const handleRouteChange = () => closeMenu();
        window.addEventListener('popstate', handleRouteChange);
        return () => window.removeEventListener('popstate', handleRouteChange);
    }, []);

    return (
        <>
            <header
                className={`flex items-center justify-between whitespace-nowrap border-b border-slate-200 dark:border-slate-800 px-6 md:px-20 py-4 transition-all duration-300 sticky top-0 z-50 ${isScrolled
                    ? 'bg-white/90 dark:bg-slate-900/90 backdrop-blur-md shadow-md'
                    : 'bg-white/80 dark:bg-slate-900/50 backdrop-blur-md'
                    }`}
            >
                <div className="flex items-center gap-8">
                    <Link
                        href="/"
                        className="flex items-center gap-3"
                        onClick={closeMenu}
                    >
                        <div>
                            <Image className='h-12 w-auto object-contain' src={Logo} alt='Ingla School Logo' />
                        </div>

                    </Link>

                    <nav className="hidden lg:flex items-center gap-8">
                        <NavLinks />
                    </nav>
                </div>

                <div className="flex flex-1 justify-end gap-4 items-center">
                    <label className="hidden md:flex flex-col min-w-40 h-10 max-w-64">
                        <div className="flex w-full flex-1 items-stretch rounded-lg h-full overflow-hidden border border-slate-200 dark:border-slate-700">
                            <div className="text-slate-500 bg-slate-50 dark:bg-slate-800 flex items-center justify-center px-3">
                                <span className="material-symbols-outlined text-[20px]">search</span>
                            </div>
                            <input className="w-full border-none bg-slate-50 dark:bg-slate-800 focus:ring-0 text-sm placeholder:text-slate-400 text-slate-900 dark:text-slate-100 outline-none" placeholder="Axtarış..." />
                        </div>
                    </label>

                    <button className="hidden sm:flex items-center justify-center rounded-lg h-10 px-6 bg-primary text-slate-900 text-sm font-bold hover:brightness-105 transition-all">
                        Bizimlə Əlaqə
                    </button>

                    <button
                        onClick={toggleMobileMenu}
                        className="lg:hidden flex items-center justify-center text-slate-900 dark:text-slate-100 p-2 focus:outline-none rounded-md"
                        aria-label={mobileMenuOpen ? "Close mobile menu" : "Open mobile menu"}
                        aria-expanded={mobileMenuOpen}
                    >
                        <span className="material-symbols-outlined text-2xl">
                            {mobileMenuOpen ? 'close' : 'menu'}
                        </span>
                    </button>
                </div>
            </header>

            {mobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-white/95 dark:bg-slate-950/95 backdrop-blur-sm z-40 transition-all duration-300 lg:hidden pt-20"
                    aria-hidden="false"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="mobile-menu-heading"
                >
                    <div className="h-full flex flex-col items-center p-6 overflow-y-auto">
                        <h2 id="mobile-menu-heading" className="sr-only">Mobile navigation menu</h2>

                        <nav className="flex flex-col items-center space-y-8 w-full">
                            <NavLinks isMobile={true} closeMenu={closeMenu} />

                            <div className="w-full h-px bg-slate-200 dark:bg-slate-800 my-4"></div>

                            <label className="flex w-full max-w-sm flex-col h-12">
                                <div className="flex w-full flex-1 items-stretch rounded-lg h-full overflow-hidden border border-slate-200 dark:border-slate-700">
                                    <div className="text-slate-500 bg-slate-50 dark:bg-slate-800 flex items-center justify-center px-3">
                                        <span className="material-symbols-outlined text-[20px]">search</span>
                                    </div>
                                    <input className="w-full border-none bg-slate-50 dark:bg-slate-800 focus:ring-0 text-sm placeholder:text-slate-400 text-slate-900 dark:text-slate-100 outline-none" placeholder="Axtarış..." />
                                </div>
                            </label>

                            <button className="flex w-full max-w-sm items-center justify-center rounded-lg h-12 px-6 bg-primary text-slate-900 text-base font-bold hover:brightness-105 transition-all">
                                Bizimlə Əlaqə
                            </button>
                        </nav>
                    </div>
                </div>
            )}
        </>
    );
};

interface NavLinksProps {
    isMobile?: boolean;
    closeMenu?: () => void;
}

const NavLinks = ({ isMobile = false, closeMenu = () => { } }: NavLinksProps) => {
    const linkClasses = `text-slate-700 dark:text-slate-300 font-medium hover:text-primary transition-colors ${isMobile ? 'text-2xl font-bold' : 'text-sm'
        }`;

    const links = [
        { name: 'Tədris İstiqamətlərimiz', path: '/services' },
        { name: 'Xaricdə Təhsil', path: '/studyabroad' },
        { name: 'Preschool', path: '/preschool' },
        { name: 'Təlim Mərkəzi', path: '/training-center' },
        { name: 'Haqqımızda', path: '/about' },
        { name: 'Blog', path: '/blog' },
    ];

    return (
        <>
            {links.map((link) => (
                <Link
                    key={link.name}
                    href={link.path}
                    className={linkClasses}
                    onClick={isMobile ? closeMenu : undefined}
                >
                    {link.name}
                </Link>
            ))}
        </>
    );
};

export default Navbar;
