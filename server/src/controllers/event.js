import Event from "../models/Event.js";
import EventRSVP from "../models/eventRSVP.js";

export const createEvent = async (req, res) => {
    const { title, date, location, description } = req.body;

    // Log the request body for debugging
    console.log("Request body:", req.body);

    // Validate required fields
    if (!title || !date || !location || !description) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const newEvent = new Event({
            title,
            date,
            location,
            description,
        });

        const savedEvent = await newEvent.save();
        res.status(201).json({
            success: true,
            message: "Event created successfully",
            event: savedEvent
        });
    } catch (error) {
        console.error("Error creating event:", error);
        res.status(500).json({
            success: false,
            message: "Failed to create event",
            error: error.message
        });
    }
};

export const updateEvent = async (req, res) => {
    const { id } = req.params;
    const { title, date, location, description } = req.body;

    try {
        const updatedEvent = await Event.findByIdAndUpdate(id, {
            title,
            date,
            location,
            description
        }, { new: true });

        if (!updatedEvent) {
            res.status(404).json({ message: "Event not found" });
        } else {
            res.status(200).json({ message: "Event updated successfully", event: updatedEvent });
        }
    } catch (error) {
        console.error("Error updating event:", error);
        res.status(500).json({ message: "Failed to update event" });
    }
};

export const deleteEvent = async (req, res) => {
    const { id } = req.params;

    try {
        // First, delete all RSVPs associated with this event
        await EventRSVP.deleteMany({ eventId: id });
        
        // Then delete the event
        const deletedEvent = await Event.findByIdAndDelete(id);

        if (!deletedEvent) {
            return res.status(404).json({ 
                success: false,
                message: "Event not found" 
            });
        }

        res.status(200).json({ 
            success: true,
            message: "Event and associated RSVPs deleted successfully" 
        });
    } catch (error) {
        console.error("Error deleting event:", error);
        res.status(500).json({ 
            success: false,
            message: "Failed to delete event",
            error: error.message 
        });
    }
};

export const getEvents = async (req, res) => {
    try {
        const events = await Event.find();

        res.status(200).json(events);
    } catch (error) {
        console.error("Error fetching events:", error);
        res.status(500).json({ message: "Failed to fetch events" });
    }
};