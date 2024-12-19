import express from "express";
import { createRSVP, getRSVPsByUser } from "../controllers/eventRSVP.js";


const router = express.Router();

router.post("/create", createRSVP);
router.get("/user/:userId", getRSVPsByUser);

export default router;