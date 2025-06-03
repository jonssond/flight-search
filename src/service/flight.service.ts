import { Flight } from "../entity/flight.entity"; 
import { AppDataSource } from "../config/database/data-source";

export class FlightService {
    private flightRepository = AppDataSource.getRepository(Flight);

    async getAll(): Promise<Flight[]> {
        const flightsList: Flight[] = await this.flightRepository.find();
        return flightsList;
    }
}