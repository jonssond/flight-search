import { Request, Response } from "express";
import { FlightService } from "../service/flight.service";

export class FlightController {
    private flightService: FlightService;

    constructor() {
        this.flightService = new FlightService();
    }

    async getAll(req: Request, res: Response) {
        try {
            const { page, limit } = this.extractPaginationParams(req);
            const filters = this.extractFilters(req);
            const { sortBy, sortOrder } = this.extractSortingParams(req);

            const serviceResult = await this.flightService.getAll(page, limit, filters, sortBy, sortOrder);
            
            const response = this.buildPaginatedResponse(serviceResult, page, limit);
            res.json(response);
        } catch (error) {
            this.handleError(res, error);
        }
    }

    private extractPaginationParams(req: Request) {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;
        return { page, limit };
    }

    private extractFilters(req: Request) {
        return {
            origin: req.query.origin as string,
            destination: req.query.destination as string,
            departureDate: req.query.departureDate as string,
            arrivalDate: req.query.arrivalDate as string,
        };
    }

    private extractSortingParams(req: Request) {
        const sortBy = req.query.sortBy as string;
        const sortOrder = req.query.sortOrder as 'asc' | 'desc';
        return { sortBy, sortOrder };
    }

    private buildPaginatedResponse(serviceResult: any, page: number, limit: number) {
        return {
            flights: serviceResult.flights,
            meta: {
                currentPage: page,
                totalPages: Math.ceil(serviceResult.total / limit),
                totalItems: serviceResult.total,
                itemsPerPage: limit,
            },
        };
    }

    private handleError(res: Response, error: any) {
        console.error('Flight controller error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}