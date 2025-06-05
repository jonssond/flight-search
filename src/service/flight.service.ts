import { Flight } from "../entity/flight.entity";
import { FlightRepository } from "../repository/flight.repository";

export interface PaginatedFlightServiceResponse {
    flights: Flight[];
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
}

export class FlightService {
    private flightRepository: FlightRepository;

    constructor() {
        this.flightRepository = new FlightRepository();
    }

    async getAll(page: number, limit: number, filters: any, sortBy?: string, sortOrder?: 'asc' | 'desc') {
        const skip = (page - 1) * limit;
        
        const whereCondition: any = {};
        
        if (filters.origin) {
            whereCondition.origin = { contains: filters.origin, mode: 'insensitive' };
        }
        
        if (filters.destination) {
            whereCondition.destination = { contains: filters.destination, mode: 'insensitive' };
        }
        
        if (filters.departureDate) {
            const dateStr = filters.departureDate;
            const startOfDay = new Date(`${dateStr}T00:00:00.000Z`);
            const endOfDay = new Date(`${dateStr}T23:59:59.999Z`);
            
            whereCondition.departure = {
                gte: startOfDay,
                lte: endOfDay,
            };
        }
        
        if (filters.arrivalDate) {
            const dateStr = filters.arrivalDate;
            const startOfDay = new Date(`${dateStr}T00:00:00.000Z`);
            const endOfDay = new Date(`${dateStr}T23:59:59.999Z`);
            
            whereCondition.arrival = {
                gte: startOfDay,
                lte: endOfDay,
            };
        }

        return await this.flightRepository.getAllWithFilters(whereCondition, skip, limit, sortBy, sortOrder);
    }
}