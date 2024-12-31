import { Link } from "react-router-dom";
const Footer = () => {
    return (
        <footer className="bg-gradient-to-b from-gray-800 to-gray-900 text-white mt-auto">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {/* Company Info */}
                    <div className="text-center">
                        <h3 className="text-2xl font-bold mb-4 text-blue-400">EventPlanner</h3>
                        <p className="text-gray-300 leading-relaxed">
                            Making event management simple and efficient for everyone.
                            We bring your vision to life with style and precision.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="text-center">
                        <h3 className="text-2xl font-bold mb-4 text-blue-400">Quick Links</h3>
                        <ul className="space-y-3">
                            <li>
                                <Link to="/login" className="text-gray-300 hover:text-blue-400 transition duration-300">
                                    Login
                                </Link>
                            </li>
                            <li>
                                <Link to="/contact" className="text-gray-300 hover:text-blue-400 transition duration-300">
                                    Contact Us
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="text-center">
                        <h3 className="text-2xl font-bold mb-4 text-blue-400">Contact Us</h3>
                        <div className="text-gray-300 space-y-3">
                            <p className="flex items-center justify-center gap-2">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                                </svg>
                                info@eventplanner.com
                            </p>
                            <p className="flex items-center justify-center gap-2">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                                </svg>
                                (555) 123-4567
                            </p>
                            <p className="flex items-center justify-center gap-2">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
                                </svg>
                                123 Event Street, City, Country
                            </p>
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-400">
                    <p>&copy; {new Date().getFullYear()} EventPlanner. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;