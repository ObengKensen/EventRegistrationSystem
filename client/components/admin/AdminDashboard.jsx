import { useState } from 'react';
import EventCard from '../common/EventCard';

function AdminDashboard() {
  const [events, setEvents] = useState([]);

  const handleEditEvent = (eventId) => {
    // Add edit logic
    console.log('Editing event:', eventId);
  };

  const handleDeleteEvent = (eventId) => {
    // Add delete logic
    console.log('Deleting event:', eventId);
  };

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <button className="create-event-btn">Create New Event</button>
      
      <div className="events-grid">
        {events.map(event => (
          <EventCard
            key={event.id}
            event={{
              ...event,
              isAdmin: true,
              onEdit: handleEditEvent,
              onDelete: handleDeleteEvent
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default AdminDashboard; 