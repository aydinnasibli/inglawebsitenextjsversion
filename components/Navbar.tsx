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
        // Store original body overflow style
        const originalStyle = window.getComputedStyle(document.body).overflow;

        if (mobileMenuOpen) {
            // Prevent scrolling on the body when menu is open
            document.body.style.overflow = 'hidden';
        } else {
            // Re-enable scrolling when menu is closed
            document.body.style.overflow = originalStyle;
        }

        return () => {
            // Cleanup on unmount
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
        // This will close the menu when navigation occurs
        const handleRouteChange = () => {
            closeMenu();
        };

        // Add event listener for route changes if you're using Next.js router events
        window.addEventListener('popstate', handleRouteChange);

        return () => {
            window.removeEventListener('popstate', handleRouteChange);
        };
    }, []);

    return (
        <>
            {/* Fixed header that changes style on scroll */}
            <header
                className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b ${isScrolled
                    ? 'glass border-white/5 py-4'
                    : 'bg-transparent border-transparent py-6'
                    }`}
            >
                <div className="container mx-auto px-4 flex justify-between items-center">
                    {/* Logo - Added onClick to close menu when logo is clicked */}
                    <Link
                        href="/"
                        className="relative z-50"
                        onClick={handleNavigation}
                    >
                        <Image
                            className='w-24 h-auto drop-shadow-lg hover:scale-105 transition-transform duration-300'
                            src={Logo}
                            alt='Ingla School'
                            priority
                        />
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-1">
                        <NavLinks />
                    </nav>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={toggleMobileMenu}
                        className="md:hidden text-white p-2 relative z-50 hover:bg-white/10 rounded-lg transition-colors"
                        aria-label={mobileMenuOpen ? "Close mobile menu" : "Open mobile menu"}
                        aria-expanded={mobileMenuOpen}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6"
                            aria-hidden="true"
                        >
                            {mobileMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                            )}
                        </svg>
                    </button>
                </div>
            </header>

            {/* Mobile Navigation Overlay */}
            {/* Using conditional rendering for complete accessibility */}
            {mobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/95 backdrop-blur-xl z-40 transition-all duration-300"
                    aria-hidden="false"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="mobile-menu-heading"
                >
                    <div className="h-full flex flex-col justify-center items-center p-6 relative overflow-hidden">
                        {/* Decorative Background Elements */}
                        <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-yellow-500/10 rounded-full blur-[100px] pointer-events-none" />
                        <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[80px] pointer-events-none" />

                        <h2 id="mobile-menu-heading" className="sr-only">Mobile navigation menu</h2>

                        <nav className="flex flex-col items-center space-y-6 relative z-10">
                            <NavLinks isMobile={true} closeMenu={closeMenu} />
                        </nav>
                    </div>
                </div>
            )}
        </>
    );
};

// Shared navigation links component
interface NavLinksProps {
    isMobile?: boolean;
    closeMenu?: () => void;
}

const NavLinks = ({ isMobile = false, closeMenu = () => { } }: NavLinksProps) => {
    const baseClasses = "relative group transition-all duration-300";
    const mobileClasses = "text-3xl font-bold text-white hover:text-yellow-400 py-2";
    const desktopClasses = "text-sm font-medium text-gray-200 hover:text-white px-4 py-2 rounded-full hover:bg-white/5";

    const links = [
        { name: 'Tədris İstiqamətlərimiz', path: '/services' },
        { name: 'Xaricdə Təhsil', path: '/studyabroad' },
        { name: 'Preschool', path: '/preschool' },
        { name: 'Təlim Mərkəzi', path: '/training-center' },
        { name: 'Haqqımızda', path: '/about' },
    ];

    return (
        <>
            {links.map((link) => (
                <Link
                    key={link.name}
                    href={link.path}
                    className={`${baseClasses} ${isMobile ? mobileClasses : desktopClasses}`}
                    onClick={isMobile ? closeMenu : undefined}
                >
                    <span className="relative z-10">{link.name}</span>
                    {!isMobile && (
                        <span className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-yellow-400 transition-all duration-300 group-hover:w-[60%] opacity-0 group-hover:opacity-100" />
                    )}
                </Link>
            ))}
        </>
    );
};

export default Navbar;