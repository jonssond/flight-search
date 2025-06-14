import { Router } from "express";
import { FlightController } from "../controller/flight.controller";

const router = Router();
const flightController = new FlightController();

router.get('/flights', flightController.getAll.bind(flightController));

export default router;
