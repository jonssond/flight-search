import { Request, Response } from "express";
import { FlightService, PaginatedFlightServiceResponse } from "../service/flight.service";

export class FlightController {
    private flightService: FlightService;

    constructor() {
        this.flightService = new FlightService();
    }

    async getAll(req: Request, res: Response) {
        try {
            const page = parseInt(req.query.page as string) || 1;
            const limit = parseInt(req.query.limit as string) || 10;
            
            const filters = {
                origin: req.query.origin as string,
                destination: req.query.destination as string,
                departureDate: req.query.departureDate as string,
                arrivalDate: req.query.arrivalDate as string,
            };

            console.log("FILTERS: (flight.controller.ts)", filters);

            const serviceResult = await this.flightService.getAll(page, limit, filters);
            
            res.json({
                flights: serviceResult.flights,
                meta: {
                currentPage: page,
                totalPages: Math.ceil(serviceResult.total / limit),
                totalItems: serviceResult.total,
                itemsPerPage: limit,
                },
            });
            } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
            }
    }
}