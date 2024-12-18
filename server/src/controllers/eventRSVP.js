import EventRSVP from "../models/eventRSVP.js";

export const createRSVP = async (req, res) => {
    const { userId, eventId } = req.body;

    try {
        // Check if user has already RSVP'd for this event
        const existingRSVP = await EventRSVP.findOne({ 
            userId, 
            eventId: eventId.toString() 
        });
        
        if (existingRSVP) {
            return res.status(400).json({ 
                success: false,
                message: "You have already RSVP'd for this event" 
            });
        }

        const newRSVP = new EventRSVP({
            userId,
            eventId: eventId.toString()
        });

        await newRSVP.save();
        res.status(201).json({ 
            success: true,
            message: "Successfully RSVP'd for the event!", 
            rsvp: newRSVP 
        });
    } catch (error) {
        console.error("Error creating RSVP:", error);
        res.status(500).json({ 
            success: false,
            message: "Failed to create RSVP",
            error: error.message 
        });
    }
};

export const getRSVPsByUser = async (req, res) => {
    const { userId } = req.params;

    try {
        const rsvps = await EventRSVP.find({ userId });
        res.status(200).json(rsvps.map(rsvp => ({
            ...rsvp.toObject(),
            eventId: rsvp.eventId.toString()
        })));
    } catch (error) {
        console.error("Error fetching RSVPs:", error);
        res.status(500).json({ 
            success: false,
            message: "Failed to fetch RSVPs" 
        });
    }
};



