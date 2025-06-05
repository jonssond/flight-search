// src/repository/flight.repository.ts
import { Repository } from "typeorm";
import { Flight } from "../entity/flight.entity";
import { AppDataSource } from "../config/database/data-source";

export interface PaginatedFlightsResult {
    data: Flight[];
    total: number;
}

export class FlightRepository {
    private repository: Repository<Flight>;

    constructor() {
        this.repository = AppDataSource.getRepository(Flight);
    }

    async getAll(page: number, limit: number): Promise<PaginatedFlightsResult> {
        const skip = (page - 1) * limit;

        const [data, total] = await this.repository.findAndCount({
            skip: skip,
            take: limit,
        });

        return { data, total };
    }
}