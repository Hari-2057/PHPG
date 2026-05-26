import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Activity, LayoutDashboard, Calculator, BookOpen, Menu, X, Utensils, Wind, Dumbbell } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);

    const links = [
        { name: 'Home', path: '/', icon: <LayoutDashboard size={20} /> },
        { name: 'Meals', path: '/meals', icon: <Utensils size={20} /> },
        { name: 'Active', path: '/workouts', icon: <Dumbbell size={20} /> },
        { name: 'Mind', path: '/mindfulness', icon: <Wind size={20} /> },
        { name: 'Tools', path: '/tools', icon: <Calculator size={20} /> },
    ];

    const isActive = (path) => location.pathname === path;

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2">
                        <div className="bg-gradient-to-tr from-indigo-600 to-violet-600 text-white p-2 rounded-lg">
                            <Activity size={24} />
                        </div>
                        <span className="font-bold text-xl text-gray-900 tracking-tight">HealthAI</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-1">
                        {links.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
                                    ${isActive(link.path)
                                        ? 'bg-indigo-50 text-indigo-700 shadow-sm ring-1 ring-indigo-200'
                                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}
                            >
                                {link.icon}
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-white border-b border-gray-100 overflow-hidden"
                    >
                        <div className="px-4 py-3 space-y-1">
                            {links.map((link) => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    onClick={() => setIsOpen(false)}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium transition-colors
                                        ${isActive(link.path)
                                            ? 'bg-indigo-50 text-indigo-700'
                                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}
                                >
                                    {link.icon}
                                    {link.name}
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
