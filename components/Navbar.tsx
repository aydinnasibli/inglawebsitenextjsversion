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
            if (window.scrollY > 10) {
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

    // Toggle mobile menu
    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    // Close mobile menu
    const closeMenu = () => {
        setMobileMenuOpen(false);
    };

    // Close mobile menu on navigation
    const handleNavigation = () => {
        closeMenu();
    };

    // Close mobile menu on escape key press
    useEffect(() => {
        const handleEscKeypress = (event: KeyboardEvent) => {
            if (event.key === 'Escape' && mobileMenuOpen) {
                closeMenu();
            }
        };
        window.addEventListener('keydown', handleEscKeypress);
        return () => {
            window.removeEventListener('keydown', handleEscKeypress);
        };
    }, [mobileMenuOpen]);

    // Close menu on route change
    useEffect(() => {
        const handleRouteChange = () => {
            closeMenu();
        };
        window.addEventListener('popstate', handleRouteChange);
        return () => {
            window.removeEventListener('popstate', handleRouteChange);
        };
    }, []);

    return (
        <>
            <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b border-solid ${isScrolled ? 'border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-sm py-3' : 'border-transparent bg-white dark:bg-slate-900 py-4'}`}>
                <div className="max-w-[1200px] mx-auto px-6 md:px-10 flex items-center justify-between whitespace-nowrap">
                    <div className="flex items-center gap-8">
                        <Link href="/" className="flex items-center gap-3 text-slate-900 dark:text-slate-100" onClick={handleNavigation}>
                            <div className="size-10 bg-primary rounded-lg flex items-center justify-center overflow-hidden">
                                <Image src={Logo} alt="Ingla School Logo" className="w-full h-full object-contain" />
                            </div>
                            <h2 className="text-xl font-bold leading-tight tracking-tight">Ingla School</h2>
                        </Link>

                        <nav className="hidden lg:flex items-center gap-6">
                            <NavLinks />
                        </nav>
                    </div>

                    <div className="flex flex-1 justify-end gap-4 md:gap-8 items-center">
                        <label className="hidden md:flex flex-col min-w-40 h-10 max-w-64">
                            <div className="flex w-full flex-1 items-stretch rounded-lg h-full bg-slate-100 dark:bg-slate-800">
                                <div className="text-slate-500 flex items-center justify-center pl-4">
                                    <span className="material-symbols-outlined text-[20px]">search</span>
                                </div>
                                <input className="form-input flex w-full min-w-0 flex-1 border-none bg-transparent focus:ring-0 text-sm placeholder:text-slate-500" placeholder="Search courses..." defaultValue="" />
                            </div>
                        </label>
                        <button className="hidden sm:flex min-w-[100px] cursor-pointer items-center justify-center rounded-lg h-10 px-5 bg-primary text-slate-900 text-sm font-bold hover:brightness-95 transition-all">
                            Sign Up
                        </button>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={toggleMobileMenu}
                            className="lg:hidden text-slate-900 dark:text-slate-100 p-2 focus:outline-none focus:ring-2 focus:ring-primary rounded-md"
                            aria-label={mobileMenuOpen ? "Close mobile menu" : "Open mobile menu"}
                            aria-expanded={mobileMenuOpen}
                        >
                            <span className="material-symbols-outlined text-[28px]">
                                {mobileMenuOpen ? 'close' : 'menu'}
                            </span>
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile Navigation Overlay */}
            {mobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm z-40 transition-all duration-300 lg:hidden"
                    aria-hidden="false"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="mobile-menu-heading"
                >
                    <div className="h-full flex flex-col justify-center items-center p-6 mt-16">
                        <h2 id="mobile-menu-heading" className="sr-only">Mobile navigation menu</h2>
                        <nav className="flex flex-col items-center space-y-8">
                            <NavLinks isMobile={true} closeMenu={closeMenu} />
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
    const linkClasses = `text-slate-700 dark:text-slate-300 font-medium hover:text-primary transition-colors ${isMobile ? 'text-2xl' : 'text-sm'}`;

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
