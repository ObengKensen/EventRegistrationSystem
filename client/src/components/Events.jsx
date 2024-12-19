import React, { useState, useEffect } from "react";
import axios from 'axios';
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Events = () => {
    const [events, setEvents] = useState([]);
    const [userRSVPs, setUserRSVPs] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

    useEffect(() => {
        const checkAuth = () => {
            const token = localStorage.getItem('token');
            setIsLoggedIn(!!token);
            if (!token) {
                setUserRSVPs([]);
            }
        };

        // Check initially
        checkAuth();

        // Listen for custom logout event
        const handleLogout = () => {
            setIsLoggedIn(false);
            setUserRSVPs([]);
        };

        window.addEventListener('logout', handleLogout);
        window.addEventListener('storage', checkAuth);

        return () => {
            window.removeEventListener('logout', handleLogout);
            window.removeEventListener('storage', checkAuth);
        };
    }, []);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/event`);
                setEvents(response.data);
            } catch (error) {
                console.error("Error fetching events:", error);
                toast.error("Failed to load events");
            }
        };
        
        const fetchUserRSVPs = async () => {
            if (!isLoggedIn) {
                setUserRSVPs([]);
                return;
            }

            try {
                const token = localStorage.getItem('token');
                const userId = JSON.parse(atob(token.split('.')[1])).userId;
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/eventRSVP/user/${userId}`);
                setUserRSVPs(response.data);
            } catch (error) {
                console.error("Error fetching user RSVPs:", error);
                setUserRSVPs([]);
            }
        };

        fetchEvents();
        fetchUserRSVPs();
    }, [isLoggedIn]);

    const hasUserRSVPd = (eventId) => {
        if (!isLoggedIn) return false;
        return userRSVPs.some(rsvp => rsvp.eventId === eventId.toString());
    };

    const handleRSVP = async (eventId) => {    
        try {
            if (!isLoggedIn) {
                toast.error("You must be logged in to RSVP for events.");
                return;
            }
            
            const token = localStorage.getItem('token');
            if (!token) {
                setIsLoggedIn(false);
                toast.error("You must be logged in to RSVP for events.");
                return;
            }
            
            if (hasUserRSVPd(eventId)) {
                toast.info("You have already RSVP'd for this event!");
                return;
            }
            
            const userId = JSON.parse(atob(token.split('.')[1])).userId;
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/eventRSVP/create`, {
                userId,
                eventId
            });

            if (response.data.success) {
                toast.success(response.data.message);
                setUserRSVPs(prevRSVPs => [...prevRSVPs, { 
                    eventId: eventId.toString(),
                    userId 
                }]);
            } else {
                toast.error(response.data.message || "Failed to RSVP for event.");
            }
        } catch (error) {
            console.error("Error sending RSVP:", error);
            const errorMessage = error.response?.data?.message || 'Failed to RSVP for the event';
            toast.error(errorMessage);
        }
    };

    return (
        <div className="flex-grow py-10 px-6 bg-gradient-to-b from-gray-50 to-gray-100 h-full">
            <ToastContainer />
            <div className="container mx-auto h-full">
                <h2 className="text-4xl font-bold mb-12 text-center text-gray-800 hover:text-blue-600 transition-colors duration-300">
                    Upcoming Events
                </h2>
                {events.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {events.map(event => (
                            <div key={event._id} className="bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 border-2 border-transparent hover:border-blue-400">
                                <div className="p-8">
                                    <div className="bg-blue-50 rounded-lg p-4 mb-6">
                                        <h3 className="text-2xl font-semibold text-gray-800 text-center hover:text-blue-600 transition-colors duration-300">{event.title}</h3>
                                    </div>
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-center bg-gray-50 rounded-lg p-3 hover:bg-blue-50 transition-colors duration-300">
                                            <svg className="w-6 h-6 text-blue-500 mr-3" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                                                <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                            </svg>
                                            <p className="text-gray-700 font-medium">{event.date}</p>
                                        </div>
                                        <div className="flex items-center justify-center bg-gray-50 rounded-lg p-3 hover:bg-blue-50 transition-colors duration-300">
                                            <svg className="w-6 h-6 text-blue-500 mr-3" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                                                <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                                                <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                            </svg>
                                            <p className="text-gray-700 font-medium">{event.location}</p>
                                        </div>
                                    </div>
                                    <div className="mt-6 bg-gray-50 rounded-lg p-4 hover:bg-blue-50 transition-colors duration-300">
                                        <p className="text-gray-700 text-center leading-relaxed">{event.description}</p>
                                    </div>
                                    <button 
                                        onClick={() => handleRSVP(event._id)}
                                        disabled={hasUserRSVPd(event._id)}
                                        className={`w-full mt-6 py-3 px-6 rounded-lg font-semibold transition duration-300 flex items-center justify-center group
                                            ${hasUserRSVPd(event._id) 
                                                ? 'bg-green-600 text-white cursor-not-allowed'
                                                : 'bg-blue-600 text-white hover:bg-blue-700'}`}
                                    >
                                        <svg className="w-6 h-6 mr-2 transform group-hover:scale-110 transition-transform duration-300" 
                                             fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                                             viewBox="0 0 24 24" stroke="currentColor">
                                            <path d="M5 13l4 4L19 7"></path>
                                        </svg>
                                        <span className="group-hover:tracking-wider transition-all duration-300">
                                            {hasUserRSVPd(event._id) ? 'RSVP Done' : 'RSVP Now'}
                                        </span>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center h-full bg-white rounded-xl shadow-lg p-8">
                        <svg className="w-20 h-20 text-blue-400 mb-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                            <path d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v12a2 2 0 01-2 2z"></path>
                            <path d="M16 2v4"></path>
                            <path d="M8 2v4"></path>
                            <path d="M3 10h18"></path>
                        </svg>
                        <h3 className="text-3xl font-semibold text-gray-700 mb-3">No Events Found</h3>
                        <p className="text-gray-500 text-lg">Check back later for upcoming events!</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Events;