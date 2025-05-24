"use client";

import { useState, useEffect, useCallback, useMemo } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// Types
interface NavLink {
    name: string;
    path: string;
}

interface NavLinksProps {
    isMobile?: boolean;
    closeMenu?: () => void;
    currentPath?: string;
}

// Navigation data
const NAV_LINKS: NavLink[] = [
    { name: 'Tədris İstiqamətlərimiz', path: '/services' },
    { name: 'Xaricdə Təhsil', path: '/studyabroad' },
    { name: 'Preschool', path: '/preschool' },
    { name: 'Təlim Mərkəzi', path: '/training-center' },
    { name: 'Haqqımızda', path: '/about' },
] as const;

// Constants
const SCROLL_THRESHOLD = 50;
const NAVBAR_BREAKPOINT = 'md';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();

    // Memoized scroll handler to prevent unnecessary re-renders
    const handleScroll = useCallback(() => {
        const scrollY = window.scrollY;
        setIsScrolled(scrollY > SCROLL_THRESHOLD);
    }, []);

    // Debounced scroll handler for better performance
    const debouncedHandleScroll = useMemo(() => {
        let timeoutId: NodeJS.Timeout;
        return () => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(handleScroll, 10);
        };
    }, [handleScroll]);

    // Handle scroll effect
    useEffect(() => {
        // Set initial state
        handleScroll();

        window.addEventListener('scroll', debouncedHandleScroll, { passive: true });
        return () => window.removeEventListener('scroll', debouncedHandleScroll);
    }, [debouncedHandleScroll, handleScroll]);

    // Handle body scroll lock
    useEffect(() => {
        if (isMobileMenuOpen) {
            const originalOverflow = document.body.style.overflow;
            document.body.style.overflow = 'hidden';

            return () => {
                document.body.style.overflow = originalOverflow;
            };
        }
    }, [isMobileMenuOpen]);

    // Handle keyboard events
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape' && isMobileMenuOpen) {
                closeMobileMenu();
            }
        };

        if (isMobileMenuOpen) {
            document.addEventListener('keydown', handleKeyDown);
            return () => document.removeEventListener('keydown', handleKeyDown);
        }
    }, [isMobileMenuOpen]);

    // Close menu on route change
    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [pathname]);

    // Menu handlers
    const toggleMobileMenu = useCallback(() => {
        setIsMobileMenuOpen(prev => !prev);
    }, []);

    const closeMobileMenu = useCallback(() => {
        setIsMobileMenuOpen(false);
    }, []);

    const handleLogoClick = useCallback(() => {
        closeMobileMenu();
    }, [closeMobileMenu]);

    // Computed styles
    const headerClasses = useMemo(() => {
        const baseClasses = 'fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-in-out';
        const scrolledClasses = 'bg-black/90 backdrop-blur-md py-3 shadow-lg border-b border-white/10';
        const defaultClasses = 'bg-gradient-to-b from-black/70 via-black/40 to-transparent py-5';

        return `${baseClasses} ${isScrolled ? scrolledClasses : defaultClasses}`;
    }, [isScrolled]);

    return (
        <>
            {/* Main Header */}
            <header className={headerClasses}>
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center">
                        {/* Logo */}
                        <Link
                            href="/"
                            className={`
                text-white font-bold tracking-wider transition-all duration-200
                hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-500 
                focus:ring-offset-2 focus:ring-offset-transparent rounded-md
                ${isScrolled ? 'text-2xl sm:text-3xl' : 'text-3xl sm:text-4xl'}
              `}
                            onClick={handleLogoClick}
                            aria-label="İngla - Ana səhifə"
                        >
                            <span className="text-yellow-500">İngla</span>
                        </Link>

                        {/* Desktop Navigation */}
                        <nav className={`hidden ${NAVBAR_BREAKPOINT}:flex items-center space-x-6 lg:space-x-8`}>
                            <NavLinks currentPath={pathname} />
                        </nav>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={toggleMobileMenu}
                            className={`
                ${NAVBAR_BREAKPOINT}:hidden text-white p-2 rounded-md transition-colors
                hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-yellow-500
                focus:ring-offset-2 focus:ring-offset-transparent
              `}
                            aria-label={isMobileMenuOpen ? "Menyunu bağla" : "Menyunu aç"}
                            aria-expanded={isMobileMenuOpen}
                            aria-controls="mobile-menu"
                        >
                            <MenuIcon isOpen={isMobileMenuOpen} />
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <>
                    {/* Backdrop */}
                    <div
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40"
                        onClick={closeMobileMenu}
                        aria-hidden="true"
                    />

                    {/* Menu Panel */}
                    <div
                        id="mobile-menu"
                        className="fixed inset-y-0 right-0 w-full max-w-sm bg-black/95 backdrop-blur-lg z-50 shadow-2xl"
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="mobile-menu-title"
                    >
                        <div className="flex flex-col h-full">
                            {/* Menu Header */}
                            <div className="flex justify-between items-center p-6 border-b border-white/10">
                                <h2 id="mobile-menu-title" className="text-white text-xl font-semibold">
                                    Menyu
                                </h2>
                                <button
                                    onClick={closeMobileMenu}
                                    className="text-white p-2 rounded-md hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                    aria-label="Menyunu bağla"
                                >
                                    <CloseIcon />
                                </button>
                            </div>

                            {/* Menu Content */}
                            <nav className="flex-1 px-6 py-8">
                                <div className="space-y-6">
                                    <NavLinks
                                        isMobile={true}
                                        closeMenu={closeMobileMenu}
                                        currentPath={pathname}
                                    />
                                </div>
                            </nav>
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

// Navigation Links Component
const NavLinks = ({ isMobile = false, closeMenu, currentPath }: NavLinksProps) => {
    const linkClasses = useMemo(() => {
        const baseClasses = `
      text-white font-medium tracking-wide transition-all duration-200
      hover:text-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500
      focus:ring-offset-2 focus:ring-offset-transparent rounded-md
    `;

        const desktopClasses = 'text-sm uppercase px-3 py-2 hover:bg-white/5';
        const mobileClasses = 'text-lg normal-case px-4 py-3 hover:bg-white/10 block w-full text-left';

        return `${baseClasses} ${isMobile ? mobileClasses : desktopClasses}`;
    }, [isMobile]);

    const getActiveLinkClasses = useCallback((path: string) => {
        const isActive = currentPath === path;
        return isActive
            ? `${linkClasses} text-yellow-500 ${isMobile ? 'bg-white/10' : 'bg-white/5'}`
            : linkClasses;
    }, [currentPath, linkClasses]);

    return (
        <>
            {NAV_LINKS.map((link) => (
                <Link
                    key={link.path}
                    href={link.path}
                    className={getActiveLinkClasses(link.path)}
                    onClick={isMobile ? closeMenu : undefined}
                    aria-current={currentPath === link.path ? 'page' : undefined}
                >
                    {link.name}
                </Link>
            ))}
        </>
    );
};

// Menu Icon Component
const MenuIcon = ({ isOpen }: { isOpen: boolean }) => (
    <svg
        className="w-6 h-6 transition-transform duration-200"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
    >
        {isOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        )}
    </svg>
);

// Close Icon Component
const CloseIcon = () => (
    <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
    >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
);

export default Navbar;