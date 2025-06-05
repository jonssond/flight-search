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

    async getAllWithFilters(whereCondition: any, skip: number, limit: number, sortBy?: string, sortOrder?: 'asc' | 'desc') {
        const queryBuilder = this.repository.createQueryBuilder('flight');
        
        if (whereCondition.origin?.contains) {
            queryBuilder.andWhere('LOWER(flight.origin) LIKE LOWER(:origin)', {
                origin: `%${whereCondition.origin.contains}%`
            });
        }
        
        if (whereCondition.destination?.contains) {
            queryBuilder.andWhere('LOWER(flight.destination) LIKE LOWER(:destination)', {
                destination: `%${whereCondition.destination.contains}%`
            });
        }
        
        if (whereCondition.departure?.gte && whereCondition.departure?.lte) {
            queryBuilder.andWhere('flight.departure BETWEEN :departureStart AND :departureEnd', {
                departureStart: whereCondition.departure.gte,
                departureEnd: whereCondition.departure.lte
            });
        }
        
        if (whereCondition.arrival?.gte && whereCondition.arrival?.lte) {
            queryBuilder.andWhere('flight.arrival BETWEEN :arrivalStart AND :arrivalEnd', {
                arrivalStart: whereCondition.arrival.gte,
                arrivalEnd: whereCondition.arrival.lte
            });
        }
        
        if (sortBy && sortOrder) {
            const columnMapping: { [key: string]: string } = {
                'flightNumber': 'flight_number',
                'airline': 'airline',
                'origin': 'origin',
                'destination': 'destination',
                'departure': 'departure',
                'arrival': 'arrival',
                'price': 'price'
            };
            
            const dbColumn = columnMapping[sortBy] || sortBy;
            queryBuilder.orderBy(`flight.${dbColumn}`, sortOrder.toUpperCase() as 'ASC' | 'DESC');
        } else {
            queryBuilder.orderBy('flight.departure', 'ASC');
        }
        
        queryBuilder.skip(skip).take(limit);
        
        const [flights, total] = await Promise.all([
            queryBuilder.getMany(),
            queryBuilder.getCount()
        ]);
        
        return { flights, total };
    }
}