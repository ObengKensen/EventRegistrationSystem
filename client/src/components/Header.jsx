import { FaCalendar, FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true);
        }
    }, []);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        window.dispatchEvent(new Event('logout'));
        setIsLoggedIn(false);
    };

    return (
        <header className="relative bg-white shadow-md">
            <div className="flex justify-between items-center px-4 md:px-6 py-4">
                <div className="flex items-center">
                    <FaCalendar className="w-8 h-8 mr-3 text-blue-500" />
                    <h1 className="text-2xl font-bold text-gray-800">Eventify</h1>
                </div>
                
                {/* Desktop navigation */}
                <div className="hidden md:flex gap-4">
                    {isLoggedIn ? (
                        <button 
                            onClick={handleLogout}
                            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                        >
                            Logout
                        </button>
                    ) : (
                        <Link 
                            to="/login"
                            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                        >
                            Login
                        </Link>
                    )}
                    <Link 
                        to="/contact"
                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                    >
                        Contact
                    </Link>
                </div>

                {/* Mobile menu button or Hamburger*/}
                <button 
                    className="md:hidden p-2"
                    onClick={toggleMenu}
                    aria-label="Toggle menu"
                >
                    {isMenuOpen ? (
                        <FaTimes className="w-6 h-6" />
                    ) : (
                        <FaBars className="w-6 h-6" />
                    )}
                </button>
            </div>

            {/* Mobile navigation - shown/hidden based on menu state */}
            {isMenuOpen && (
                <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-md">
                    <div className="flex flex-col p-4 gap-4">
                        {isLoggedIn ? (
                            <button 
                                onClick={handleLogout}
                                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 text-center"
                            >
                                Logout
                            </button>
                        ) : (
                            <Link 
                                to="/login"
                                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 text-center"
                            >
                                Login
                            </Link>
                        )}
                        <Link 
                            to="/contact"
                            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 text-center"
                        >
                            Contact
                        </Link>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;