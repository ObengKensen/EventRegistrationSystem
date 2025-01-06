import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./src/utils/db.js";
import authRoute from "./src/routes/auth.js"
import eventRoute from "./src/routes/event.js"
import eventRSVPRoute from "./src/routes/eventRSVP.js"
import crudRoute from "./src/routes/event.js"
import User from "./src/models/user.js";
import Event from "./src/models/Event.js";

const app = express();
dotenv.config();
const port = process.env.PORT || 3000;

const allowedOrigins = [process.env.CLIENT_URL, "https://event-registration-system-zeta.vercel.app/", 'http://localhost:5173']
app.use(cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.options('*', cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/auth', authRoute);
app.use('/api/event', eventRoute);
app.use('/api/eventRSVP', eventRSVPRoute);

connectDB();

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get("/users", async(req,res) => {
    try {
        const users = await User.find();
        res.json(users);
      } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error });
    }
})

app.get("/adminEvents", async(req,res) => {
    try {
        const events = await Event.find()
        res.json(events);
      } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error });
    }
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
