import { FlightRepository } from "../repository/flight.repository";

interface FlightFilters {
    origin?: string;
    destination?: string;
    departureDate?: string;
    arrivalDate?: string;
}

export class FlightService {
    private flightRepository: FlightRepository;

    constructor() {
        this.flightRepository = new FlightRepository();
    }

    async getAll(page: number, limit: number, filters: FlightFilters, sortBy?: string, sortOrder?: 'asc' | 'desc') {
        const skip = this.calculateSkip(page, limit);
        const whereCondition = this.buildWhereCondition(filters);
        
        return await this.flightRepository.getAllWithFilters(whereCondition, skip, limit, sortBy, sortOrder);
    }

    private calculateSkip(page: number, limit: number): number {
        return (page - 1) * limit;
    }

    private buildWhereCondition(filters: FlightFilters): any {
        const whereCondition: any = {};
        
        this.addTextFilter(whereCondition, 'origin', filters.origin);
        this.addTextFilter(whereCondition, 'destination', filters.destination);
        this.addDateFilter(whereCondition, 'departure', filters.departureDate);
        this.addDateFilter(whereCondition, 'arrival', filters.arrivalDate);
        
        return whereCondition;
    }

    private addTextFilter(whereCondition: any, field: string, value?: string): void {
        if (value) {
            whereCondition[field] = { contains: value, mode: 'insensitive' };
        }
    }

    private addDateFilter(whereCondition: any, field: string, dateStr?: string): void {
        if (dateStr) {
            const { startOfDay, endOfDay } = this.createDateRange(dateStr);
            whereCondition[field] = {
                gte: startOfDay,
                lte: endOfDay,
            };
        }
    }

    private createDateRange(dateStr: string): { startOfDay: Date; endOfDay: Date } {
        const startOfDay = new Date(`${dateStr}T00:00:00.000Z`);
        const endOfDay = new Date(`${dateStr}T23:59:59.999Z`);
        return { startOfDay, endOfDay };
    }
}