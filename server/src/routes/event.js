import express from "express";
import { createEvent, updateEvent, deleteEvent, getEvents } from "../controllers/event.js";
const router = express.Router();

router.post("/create", createEvent);
router.put("/update/:id", updateEvent);
router.delete("/delete/:id", deleteEvent);
router.get("/", getEvents);

export default router;
