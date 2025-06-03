import { Flight } from "../entity/flight.entity"; // Adjust the path as needed
import { AppDataSource } from "../config/database/data-source"; // Adjust the path as needed

export class FlightService {
    private flightRepository = AppDataSource.getRepository(Flight);

    async getAll(): Promise<Flight[]> {
        const flightsList: Flight[] = await this.flightRepository.find();
        return flightsList;
    }
}