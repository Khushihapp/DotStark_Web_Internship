
import express from "express";
import { createBooking } from "../controllers/bookingController.js";
import {getBookings} from "../controllers/bookingController.js";
import { updateBookingStatus } from "../controllers/bookingController.js";

const router = express.Router();

router.post("/", createBooking);
router.get("/",getBookings);
router.patch("/:id/status", updateBookingStatus);
export default router;

