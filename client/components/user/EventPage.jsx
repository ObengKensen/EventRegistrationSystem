import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import EventCard from '../common/EventCard';
import eventsData from '../../data/Events.json';

function EventPage() {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      setEvents(eventsData.events);
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleRegister = (eventId) => {
    navigate(`/register/${eventId}`);
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Upcoming Events
      </h1>
      
      {events.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map(event => (
            <EventCard
              key={event.id}
              event={{
                ...event,
                isAdmin: false,
                onRegister: handleRegister
              }}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12">
          <div className="bg-white p-8 rounded-xl shadow-lg text-center max-w-md w-full mx-auto">
            <div className="mb-6">
              <svg
                className="mx-auto h-24 w-24 text-gray-400 animate-pulse"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              No Events Available
            </h2>
            <p className="text-gray-600 mb-6">
              Stay tuned! New events will be added soon.
            </p>
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500">
                  Want to be notified about new events?
                </p>
                <button 
                  onClick={() => navigate('/contact')}
                  className="mt-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                >
                  Contact Us
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default EventPage; 