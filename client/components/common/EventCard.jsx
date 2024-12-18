import PropTypes from 'prop-types';

function EventCard({ event }) {
  return (
    <div className="event-card">
      <h3>{event.title}</h3>
      <div className="event-details">
        <p><strong>Date:</strong> {event.date}</p>
        <p><strong>Time:</strong> {event.time}</p>
        <p><strong>Location:</strong> {event.location}</p>
      </div>
      <p className="event-description">{event.description}</p>
      <div className="event-actions">
        {event.isAdmin ? (
          <>
            <button onClick={() => event.onEdit(event.id)}>Edit</button>
            <button onClick={() => event.onDelete(event.id)}>Delete</button>
          </>
        ) : (
          <button onClick={() => event.onRegister(event.id)}>Register</button>
        )}
      </div>
    </div>
  );
}

EventCard.propTypes = {
  event: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    isAdmin: PropTypes.bool,
    onEdit: PropTypes.func,
    onDelete: PropTypes.func,
    onRegister: PropTypes.func,
  }).isRequired,
};

export default EventCard; 