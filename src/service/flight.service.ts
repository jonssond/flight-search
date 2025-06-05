// src/service/flight.service.ts
import { Flight } from "../entity/flight.entity";
import { FlightRepository } from "../repository/FlightRepository";

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

    async getAll(page: number, limit: number, filters: any) {
    const skip = (page - 1) * limit;
    
    const whereCondition: any = {};
    
    if (filters.origin) {
      whereCondition.origin = { contains: filters.origin, mode: 'insensitive' };
    }
    
    if (filters.destination) {
      whereCondition.destination = { contains: filters.destination, mode: 'insensitive' };
    }
    
    if (filters.departureDate) {
      const startOfDay = new Date(filters.departureDate);
      startOfDay.setHours(0, 0, 0, 0);
      const endOfDay = new Date(filters.departureDate);
      endOfDay.setHours(23, 59, 59, 999);
      
      whereCondition.departure = {
        gte: startOfDay,
        lte: endOfDay,
      };
    }
    
    if (filters.arrivalDate) {
      const startOfDay = new Date(filters.arrivalDate);
      startOfDay.setHours(0, 0, 0, 0);
      const endOfDay = new Date(filters.arrivalDate);
      endOfDay.setHours(23, 59, 59, 999);
      
      whereCondition.arrival = {
        gte: startOfDay,
        lte: endOfDay,
      };
    }

    console.log("CONDIÇÃO WHERE: (flight.service.ts)", whereCondition);

    return await this.flightRepository.getAllWithFilters(whereCondition, skip, limit);

  }
}