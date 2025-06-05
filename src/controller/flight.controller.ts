import { Request, Response } from "express";
import { FlightService } from "../service/flight.service";

export class FlightController {
    private flightService: FlightService;

    constructor() {
        this.flightService = new FlightService();
    }

    async getAll(req: Request, res: Response) {
        try {
            const page = parseInt(req.query.page as string) || 1;
            const limit = parseInt(req.query.limit as string) || 10; 

            if (page <= 0 || limit <= 0) {
                return res.status(400).json({ message: 'Page and limit must be positive numbers.' });
            }

            const paginatedResult = await this.flightService.getAll(page, limit);

            res.status(200).json({
                data: paginatedResult.flights,
                meta: {
                    currentPage: paginatedResult.currentPage,
                    totalPages: paginatedResult.totalPages,
                    totalItems: paginatedResult.totalItems,
                    itemsPerPage: paginatedResult.itemsPerPage,
                }
            });
        } catch (error) {
            console.error('Error fetching flights:', error);
            let errorMessage = 'An unexpected error occurred while fetching flights.';
            res.status(500).json({ message: errorMessage });
        }
    }
}