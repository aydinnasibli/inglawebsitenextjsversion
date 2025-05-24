"use client"
import { useState, useEffect } from 'react';
import Link from 'next/link';

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
                className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled
                    ? 'bg-black/80 backdrop-blur-md py-4 shadow-md'
                    : 'bg-gradient-to-b from-black/70 to-transparent py-6'
                    }`}
            >
                <div className="container mx-auto px-4 flex justify-between items-center">
                    {/* Logo - Added onClick to close menu when logo is clicked */}
                    <Link
                        href="/"
                        className="text-white font-bold text-3xl tracking-wider"
                        onClick={handleNavigation}
                    >
                        <span className="text-yellow-500">İngla</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-8">
                        <NavLinks />


                    </nav>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={toggleMobileMenu}
                        className="md:hidden text-white p-2 focus:outline-none focus:ring-2 focus:ring-yellow-500 rounded-md"
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
                    className="fixed inset-0 bg-black/95 backdrop-blur-sm z-40 transition-all duration-300"
                    aria-hidden="false"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="mobile-menu-heading"
                >
                    <div className="h-full flex flex-col justify-center items-center p-6">
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

// Shared navigation links component
interface NavLinksProps {
    isMobile?: boolean;
    closeMenu?: () => void;
}

const NavLinks = ({ isMobile = false, closeMenu = () => { } }: NavLinksProps) => {
    const linkClasses = `text-white uppercase tracking-wider font-medium hover:text-yellow-500 transition-colors ${isMobile ? 'text-3xl' : 'text-sm'
        }`;

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