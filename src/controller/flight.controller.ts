import { Request, Response } from "express";
import { FlightService } from "../service/flight.service";

export class FlightController {
    private flightService: FlightService;

    constructor() {
        this.flightService = new FlightService();
    }

    async getAll(req: Request, res: Response) {
        try {
            const flights = await this.flightService.getAll();
            res.status(200).json(flights);
        } catch(error) {
            console.error('Error fetching flights:', error);
            res.status(500).json({ message: 'An unexpected error occurred while fetching flights.' });
        }
    }
} 