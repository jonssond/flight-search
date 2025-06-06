import { Repository, SelectQueryBuilder } from "typeorm";
import { Flight } from "../entity/flight.entity";
import { AppDataSource } from "../config/database/data-source";

export interface PaginatedFlightsResult {
    data: Flight[];
    total: number;
}

export interface FlightFilterConditions {
    origin?: { contains: string };
    destination?: { contains: string };
    departure?: { gte: Date; lte: Date };
    arrival?: { gte: Date; lte: Date };
}

export class FlightRepository {
    private repository: Repository<Flight>;
    private static readonly DEFAULT_SORT = { column: 'departure', order: 'ASC' as const };

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

    async getAllWithFilters(
            filters: FlightFilterConditions,
            skip: number,
            limit: number,
            sortBy?: string,
            sortOrder?: 'asc' | 'desc'
        ) {
            const queryBuilder = this.repository.createQueryBuilder('flight');

            this.applyFilters(queryBuilder, filters);
            this.applySorting(queryBuilder, sortBy, sortOrder);

            const [flights, total] = await queryBuilder
                .skip(skip)
                .take(limit)
                .getManyAndCount();

            return { flights, total };
        }

    private applyFilters(queryBuilder: SelectQueryBuilder<Flight>, filters: FlightFilterConditions): void {
        this.addStringContainsFilter(queryBuilder, 'origin', filters.origin?.contains);
        this.addStringContainsFilter(queryBuilder, 'destination', filters.destination?.contains);
        this.addDateBetweenFilter(queryBuilder, 'departure', filters.departure);
        this.addDateBetweenFilter(queryBuilder, 'arrival', filters.arrival);
    }

    private addStringContainsFilter(
        queryBuilder: SelectQueryBuilder<Flight>,
        field: 'origin' | 'destination', 
        value?: string
    ): void {
        if (value) {
            queryBuilder.andWhere(`LOWER(flight.${field}) LIKE LOWER(:${field})`, {
                [field]: `%${value}%`
            });
        }
    }

    private addDateBetweenFilter(
        queryBuilder: SelectQueryBuilder<Flight>,
        field: 'departure' | 'arrival',
        range?: { gte: Date; lte: Date }
    ): void {
        if (range?.gte && range?.lte) {
            queryBuilder.andWhere(`flight.${field} BETWEEN :${field}Start AND :${field}End`, {
                [`${field}Start`]: range.gte,
                [`${field}End`]: range.lte
            });
        }
    }

    private applySorting(
        queryBuilder: SelectQueryBuilder<Flight>,
        sortBy?: string,
        sortOrder?: 'asc' | 'desc'
    ): void {
        const defaultSortColumn = 'departure';
        const effectiveSortBy = sortBy || defaultSortColumn;
        const effectiveSortOrder = sortOrder?.toUpperCase() as 'ASC' | 'DESC' || 'ASC';

        const sortableColumns: { [key: string]: string } = {
            flightNumber: 'flight_number',
            airline: 'airline',
            origin: 'origin',
            destination: 'destination',
            departure: 'departure',
            arrival: 'arrival',
            price: 'price'
        };

        const dbColumn = sortableColumns[effectiveSortBy];

        if (dbColumn) {
            queryBuilder.orderBy(`flight.${dbColumn}`, effectiveSortOrder);
        } else {
            queryBuilder.orderBy(`flight.${defaultSortColumn}`, 'ASC');
        }
    }
}