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

    async getAll(page: number, limit: number): Promise<PaginatedFlightServiceResponse> {
        const { data, total } = await this.flightRepository.getAll(page, limit);

        return {
            flights: data,
            currentPage: page,
            totalPages: Math.ceil(total / limit),
            totalItems: total,
            itemsPerPage: limit,
        };
    }
}