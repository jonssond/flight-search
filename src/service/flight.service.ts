import { FlightRepository } from "../repository/flight.repository";
import { Flight } from "../entity/flight.entity"; // Adjust the path as needed
import { AppDataSource } from "../config/database/data-source"; // Adjust the path as needed

export class FlightService {
    private flightRepository: FlightRepository;

    constructor() {
        this.flightRepository = new FlightRepository(Flight, AppDataSource.manager);
    }

    async getAll(): Promise<Flight[]> {
        const flightsList: Flight[] = await this.flightRepository.getAll();
        return flightsList;
    }
}